package geo.geoproject.controller;

import geo.geoproject.service.GeoService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/geo")
public class GeoController {

    private final GeoService geoService;

    public GeoController(GeoService geoService) {
        this.geoService = geoService;
    }


    /**
     * # Method설명 : GeoServer 세션 연결 정보 조회
     * # MethodName : getConnection
     **/
    @GetMapping("/connection.proc.json")
    public ResponseEntity<Object> getConnection(HttpSession session) {
        Map<String, Object> result = geoService.getConnectionInfo(session);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }


    /**
     * # Method설명 : GeoServer 연결
     * # MethodName : geoserverConnection
     **/
    @PostMapping("/connection.proc.json")
    public ResponseEntity<Boolean> geoserverConnection(@RequestBody Map<String, Object> request, HttpSession session) {

        boolean result = geoService.connect(
                request.get("url").toString(),
                request.get("username").toString(),
                request.get("password").toString(),
                session
        );

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    /**
     * # Method설명 : GeoServer 연결 해제
     * # MethodName : geoserverDisconnect
     **/
    @GetMapping("/disconnect.proc.json")
    public ResponseEntity<Boolean> geoserverDisconnect(HttpSession session){
        boolean disconnected = geoService.disconnect(session);
        return new ResponseEntity<>(disconnected, HttpStatus.OK);
    }

    // getWorkspaces
    @GetMapping("/workspaces.proc.json")
    public ResponseEntity<Object> getWorkspaces(HttpSession session){
        return new ResponseEntity<>(geoService.getWorkspaces(session),  HttpStatus.OK);
    }

    // getLayers
    @GetMapping("/workspaces/{workspace}/layers.proc.json")
    public ResponseEntity<Object> getLayers(@PathVariable String workspace, HttpSession session){
        return new ResponseEntity<>(geoService.getLayers(session, workspace), HttpStatus.OK);
    }

}
