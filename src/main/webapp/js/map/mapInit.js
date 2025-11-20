/* 중심 좌표 EPSG:4326 */
let olCenter = [127.5, 36.5];

/* 지도 기본 타일 설정*/
let olLayer = new ol.layer.Tile({
    source: new ol.source.OSM({
        wrapX: false
    })
});

/* 지도 뷰 설정 */
let olView = new ol.View({
    center: olCenter,
    projection: 'EPSG:4326', // 좌표계 4326으로 설정
    zoom: 8
});

/* 지도 생성 */
window.olMap = new ol.Map({
    target: 'map',  // 맵 띄울 id값
    layers: [olLayer],
    view: olView
});

$(function() {

/* // WPS
    $(document)
        .off('click', '#btn-layer-search')
        .on('click', '#btn-layer-search', function () {

            const wpsUrl = "http://172.23.49.132:10021/geoserver/ows?service=WPS&version=1.0.0&request=Execute";

            const wpsRequestXml = `
<wps:Execute version="1.0.0" service="WPS" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.opengis.net/wps/1.0.0" xmlns:wfs="http://www.opengis.net/wfs" xmlns:wps="http://www.opengis.net/wps/1.0.0" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" xmlns:wcs="http://www.opengis.net/wcs/1.1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd">
  <ows:Identifier>gs:UnionFeatureCollection</ows:Identifier>
  <wps:DataInputs>
    <wps:Input>
      <ows:Identifier>first</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="1.0.0"  outputFormat="application/json" xmlns:S100="http://geoserver.com/s100">
            <wfs:Query typeName="S100:s23_coastline_240724"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
    <wps:Input>
      <ows:Identifier>second</ows:Identifier>
      <wps:Reference mimeType="text/xml" xlink:href="http://geoserver/wfs" method="POST">
        <wps:Body>
          <wfs:GetFeature service="WFS" version="1.0.0"  outputFormat="application/json" xmlns:S100="http://geoserver.com/s100">
            <wfs:Query typeName="S100:s23_land_area_240724"/>
          </wfs:GetFeature>
        </wps:Body>
      </wps:Reference>
    </wps:Input>
  </wps:DataInputs> 
  <wps:ResponseForm>
    <wps:RawDataOutput mimeType="application/json">
    <!--<wps:RawDataOutput mimeType="text/xml; subtype=wfs-collection/1.0">-->
      <ows:Identifier>result</ows:Identifier>
    </wps:RawDataOutput>
  </wps:ResponseForm>
</wps:Execute>
`;



            $.ajax({
                type: "POST",
                url: wpsUrl,
                data: wpsRequestXml,
                contentType: "text/xml",
                dataType: "json",
                // dataType: "text",
                crossOrigin: true,
                success: function (response) {
                    console.log(response);

                    // GML → Feature 변환
                    // const format = new ol.format.WFS();
                    // const features = format.readFeatures(response, {
                    //     dataProjection: "EPSG:4326",
                    //     featureProjection: "EPSG:4326",
                    // });

                    const format = new ol.format.GeoJSON();
                    const features = format.readFeatures(response, {
                        dataProjection: "EPSG:4326",
                        featureProjection: "EPSG:4326",
                    });

                    if (!features.length) {
                        alert("WPS 결과 피처가 없습니다!");
                        return;
                    }

                    // 결과 레이어 추가
                    const vectorSource = new ol.source.Vector({ features });
                    const vectorLayer = new ol.layer.Vector({
                        source: vectorSource,
                        style: new ol.style.Style({
                            fill: new ol.style.Fill({ color: "rgba(255, 0, 0, 0.4)" }),
                            stroke: new ol.style.Stroke({ color: "red", width: 2 }),
                        }),
                    });

                    olMap.addLayer(vectorLayer);
                    olMap.getView().fit(vectorSource.getExtent(), { duration: 1000, padding: [50, 50, 50, 50] });

                },
                error: function (xhr, status, error) {
                    console.error("Status:", status);
                    console.error("Error:", error);
                    console.error("Response:", xhr.responseText);
                },
            });


        });
*/

});
