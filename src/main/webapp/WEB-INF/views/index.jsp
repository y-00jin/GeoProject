<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>GeoProject</title>
    <link rel="stylesheet" href="/css/openlayers/ol.css"/>
    <link rel="stylesheet" href="/css/map/map.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.26.3/dist/sweetalert2.min.css">

</head>
<body>
<div class="flex w-screen h-screen">
    <div class="flex flex-col min-w-18 w-20 border-r border-gray-200 shadow-xs text-gray-500 font-semibold">
        <button id="menu-layer" class="menu-btn menu-btn-active flex flex-col w-full h-20 text-sm items-center justify-center cursor-pointer gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
            레이어
        </button>
        <button id="menu-analysis" class="menu-btn flex flex-col w-full h-20 text-sm items-center justify-center cursor-pointer gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg>
            공간분석
        </button>
        <button id="menu-info" class="flex flex-col w-full h-20 text-sm items-center justify-center cursor-pointer gap-1 mt-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            정보
        </button>
    </div>
    <div class="flex flex-col w-130 p-5 gap-2 overflow-y-auto text-sm/6 text-gray-900">

        <div class="grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6 ">

            <!-- 워크스페이스 -->
            <div class="sm:col-span-6 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6 border-b-1 border-gray-400/50 pb-4 ">
                <div class="sm:col-span-2 ">
                    Workspace
                </div>
                <div class="sm:col-span-4 w-full">
                    <select id="layer-workspace" class="block w-full rounded-md bg-white px-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 text-[11px] transition">
                        <option value="" selected>GeoServer 정보를 연결하세요.</option>
                    </select>
                </div>
            </div>

            <!-- 레이어 목록 -->
            <div class="sm:col-span-6 text-cyan-600 font-bold">
                레이어 <span id="layer-count">(0)</span>
            </div>


            <div id="layer-list" class="sm:col-span-6 grid grid-cols-1 gap-x-2 gap-y-4 sm:grid-cols-6">

<%--                <div class="flex gap-x-4 sm:col-span-6 px-4 justify-between">--%>
<%--                    <label for="s23_coastline_240724" class="text-sm truncate">--%>
<%--                        s23_coastline_240724--%>
<%--                    </label>--%>
<%--                    <div class="flex h-6 items-center">--%>
<%--                        <div class="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-cyan-600 transition-colors duration-200 ease-in-out has-checked:bg-cyan-600 has-focus-visible:outline-2">--%>
<%--                            <span class="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>--%>
<%--                            <input id="s23_coastline_240724" type="checkbox" name="agree-to-policies" aria-label="Agree to policies" class="absolute inset-0 appearance-none focus:outline-hidden" />--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                </div>--%>

<%--                <div class="flex gap-x-4 sm:col-span-6 px-4 justify-between">--%>
<%--                    <label for="s23_land_area_240724" class="text-sm truncate" >--%>
<%--                        s23_land_area_240724--%>
<%--                    </label>--%>
<%--                    <div class="flex h-6 items-center">--%>
<%--                        <div class="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-cyan-600 transition-colors duration-200 ease-in-out has-checked:bg-cyan-600 has-focus-visible:outline-2">--%>
<%--                            <span class="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>--%>
<%--                            <input id="s23_land_area_240724" type="checkbox" name="agree-to-policies" aria-label="Agree to policies" class="absolute inset-0 appearance-none focus:outline-hidden" />--%>
<%--                        </div>--%>
<%--                    </div>--%>
<%--                </div>--%>


            </div>

            <!--

            <div class="flex gap-x-4 sm:col-span-6 px-4 justify-between">
                <label for="s23_coastline_240724" class="text-sm truncate">
                    s23_coastline_240724
                </label>
                <div class="flex h-6 items-center">
                    <div class="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-cyan-600 transition-colors duration-200 ease-in-out has-checked:bg-cyan-600 has-focus-visible:outline-2">
                        <span class="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
                        <input id="s23_coastline_240724" type="checkbox" name="agree-to-policies" aria-label="Agree to policies" class="absolute inset-0 appearance-none focus:outline-hidden" />
                    </div>
                </div>
            </div>

            <div class="flex gap-x-4 sm:col-span-6 px-4 justify-between">
                <label for="s23_land_area_240724" class="text-sm truncate" >
                    s23_land_area_240724
                </label>
                <div class="flex h-6 items-center">
                    <div class="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-cyan-600 transition-colors duration-200 ease-in-out has-checked:bg-cyan-600 has-focus-visible:outline-2">
                        <span class="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
                        <input id="s23_land_area_240724" type="checkbox" name="agree-to-policies" aria-label="Agree to policies" class="absolute inset-0 appearance-none focus:outline-hidden" />
                    </div>
                </div>
            </div>
            -->
        </div>


    </div>
    <div id="map" class="flex w-full"></div>
</div>

<div id="geo-info-popup-back" class="fixed inset-0 bg-black opacity-50 flex items-center justify-center z-10 hidden"> </div>
<div id="geo-info-popup" class="fixed inset-0 bg-white flex flex-col z-15 rounded-xl shadow-lg p-5 w-[500px] h-[260px] m-auto overscroll-y-auto overscroll-x-none text-sm/6 text-gray-900 gap-5 hidden">
    <div class="flex justify-between">
        <p class="text-cyan-600 font-bold text-base">GeoServer Info</p>
        <button id="geo-info-popup-close" class="ml-auto cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    </div>


    <div class="grid grid-cols-1 gap-x-3 gap-y-3 sm:grid-cols-4">

        <div class="sm:col-span-2 ">
            <label for="geoserver-ip" class="block font-medium">IP</label>
            <div class="mt-2">
                <input id="geoserver-ip" type="text" value="172.22.1.150"
                       class="block w-full rounded-md bg-white disabled:bg-gray-100 px-3 py-1.5  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6" />
            </div>
        </div>

        <div class="sm:col-span-1">
            <label for="geoserver-port" class="block font-medium">Port</label>
            <div class="mt-2">
                <input id="geoserver-port" type="text" value="10021"
                       class="block w-full rounded-md bg-white disabled:bg-gray-100 px-3 py-1.5  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6" />
            </div>
        </div>

        <div class="sm:col-span-1">
            <label for="geoserver-context" class="block font-medium">Context Path</label>
            <div class="mt-2">
                <input id="geoserver-context" type="text" value="geoserver"
                       class="block w-full rounded-md bg-white disabled:bg-gray-100 px-3 py-1.5  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6" />
            </div>
        </div>

        <div class="sm:col-span-2 ">
            <label for="geoserver-id" class="block font-medium">ID</label>
            <div class="mt-2">
                <input id="geoserver-id" type="text" value="admin" class="block w-full rounded-md bg-white disabled:bg-gray-100 px-3 py-1.5  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6" />
            </div>
        </div>

        <div class="sm:col-span-1">
            <label for="geoserver-pw" class="block font-medium">PW</label>
            <div class="mt-2">
                <input id="geoserver-pw" type="text" value="geoserver" class="block w-full rounded-md bg-white disabled:bg-gray-100 px-3 py-1.5  outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6" />
            </div>
        </div>

        <div class="sm:col-span-1 flex items-end">
            <button type="button" id="geoserver-conn" class="w-full rounded-md bg-cyan-600 py-2 text-sm text-white shadow-xs hover:bg-cyan-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600 cursor-pointer">
                연결
            </button>
        </div>

    </div>

</div>


<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.26.3/dist/sweetalert2.min.js"></script>
<script src="/js/openlayers/ol.js"></script>


<script src="/js/map/mapInit.js"></script>
<script src="/js/common.js"></script>
<script src="/js/index.js"></script>
<script src="/js/ui/layer.js"></script>
<script src="/js/ui/geoInfoPopup.js"></script>
<script src="/js/ui/sidebar.js"></script>
</body>
</html>
