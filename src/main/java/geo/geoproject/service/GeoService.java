package geo.geoproject.service;

import it.geosolutions.geoserver.rest.GeoServerRESTReader;
import it.geosolutions.geoserver.rest.decoder.RESTLayer;
import it.geosolutions.geoserver.rest.decoder.RESTLayerList;
import it.geosolutions.geoserver.rest.decoder.RESTNamespace;
import it.geosolutions.geoserver.rest.decoder.utils.NameLinkElem;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@RequiredArgsConstructor
@Service
public class GeoService {

    private static final String GEO_INFO_KEY = "geoInfo";
    private static final String READER_KEY = "geoReader";

    /**
     * @Method설명 : GeoServer 연결 - reader 생성 및 상태 확인
     * @MethodName : connect
     **/
    public boolean connect(String url, String username, String password, HttpSession session) {
        try {

            GeoServerRESTReader reader = new GeoServerRESTReader(url, username, password);
            // 연결 상태 확인
            if (!reader.existGeoserver()) {
                return false;
            }

            Map<String, Object> geoInfo = new HashMap<>();
            geoInfo.put("url", url);
            geoInfo.put("username", username);
            geoInfo.put("password", password);
            geoInfo.put("connected", true);

            session.setAttribute(GEO_INFO_KEY, geoInfo);
            session.setAttribute(READER_KEY, reader);

            return true;
        } catch (Exception e) {
            session.removeAttribute(GEO_INFO_KEY);
            session.removeAttribute(READER_KEY);
            return false;
        }
    }

    /**
     * @Method설명 : GeoServer 연결 정보 조회
     * @MethodName : getConnectionInfo
     **/
    public Map<String, Object> getConnectionInfo(HttpSession session) {
        Map<String, Object> geoInfo = (Map<String, Object>) session.getAttribute(GEO_INFO_KEY);

        if (geoInfo == null || geoInfo.isEmpty()) {
            return Map.of("connected", false);
        }

        return geoInfo;
    }


    /**
     * @Method설명 : 연결 해제
     * @MethodName : disconnect
     **/
    public boolean disconnect(HttpSession session) {
        session.removeAttribute(GEO_INFO_KEY);
        session.removeAttribute(READER_KEY);
        return true;
    }

    /**
     * @Method설명 : 워크스페이스 목록 조회(워스크페이스명, URI)
     * @MethodName : getWorkspaces
     **/
    public List<Map<String, Object>> getWorkspaces(HttpSession session) {
        GeoServerRESTReader reader = getSessionReader(session);
        List<Map<String, Object>> result = null;
        if (reader == null) return result;

        List<String> wsList = reader.getWorkspaceNames();
        if (wsList == null) return result;

        result = new ArrayList<>();
        for (String wsName : wsList) {
            RESTNamespace ns = reader.getNamespace(wsName);
            String uri = (ns != null) ? ns.getURI().toString() : "";

            Map<String, Object> map = new HashMap<>();
            map.put("workspaceName", wsName);
            map.put("namespaceURI", uri);
            result.add(map);
        }
        return result;
    }

    /**
     * @Method설명 : 레이어 목록 조회
     * @MethodName : getLayers
     **/
    public List<Map<String, Object>> getLayers(HttpSession session, String workspace) {
        GeoServerRESTReader reader = getSessionReader(session);
        List<Map<String, Object>> result = new ArrayList<>();
        if (reader == null) return result;

        RESTLayerList layerList = reader.getLayers();
        if (layerList == null) return result;

        for (NameLinkElem elem : layerList) {
            String[] layerNameArr = elem.getName().split(":");

            if (layerNameArr.length < 2 || !workspace.equals(layerNameArr[0])) continue;

            try {

                RESTLayer layer = reader.getLayer(workspace, layerNameArr[1]);
                if (layer == null) continue;

                Map<String, Object> map = new HashMap<>();
                map.put("layerName", layer.getName());
                map.put("workspace", workspace);
                map.put("layerType", layer.getTypeString());
                map.put("defaultStyle", layer.getDefaultStyle());

                result.add(map);

            } catch (Exception e) {
                continue;
            }
        }

        return result;
    }


    private GeoServerRESTReader getSessionReader(HttpSession session) {
        GeoServerRESTReader reader = (GeoServerRESTReader) session.getAttribute(READER_KEY);
        if (reader != null) return reader;

        Map<String, Object> geoInfo = (Map<String, Object>) session.getAttribute(GEO_INFO_KEY);
        if (geoInfo == null) return null;

        try {

            String url = Objects.toString(geoInfo.get("url"), null);
            String username = Objects.toString(geoInfo.get("username"), null);
            String password = Objects.toString(geoInfo.get("password"), null);
            // 값이 없으면 연결 안됨
            if (url == null || username == null || password == null) {
                geoInfo.put("connected", false);
                return null;
            }

            reader = new GeoServerRESTReader(url, username, password);

            // 연결 상태 확인
            boolean connected = reader.existGeoserver();
            geoInfo.put("connected", connected);

            // 연결 실패
            if (!connected) return null;


            // 연결 성공 → 세션 저장
            session.setAttribute(READER_KEY, reader);
            return reader;

        } catch (Exception e) {
            geoInfo.put("connected", false);
            return null;
        } finally {
            session.setAttribute(GEO_INFO_KEY, geoInfo);
        }
    }
}
