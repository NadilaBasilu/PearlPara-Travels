import React, { useState, useCallback, useRef, useEffect } from 'react';

// ─── Detect whether a real Google Maps key is configured ───────────────────
const GMAPS_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY || '';
const HAS_GMAPS_KEY = GMAPS_KEY && GMAPS_KEY !== 'YOUR_GOOGLE_MAPS_API_KEY';

// ═══════════════════════════════════════════════════════════════════════════
// GOOGLE MAPS VERSION  (used when REACT_APP_GOOGLE_MAPS_KEY is set)
// ═══════════════════════════════════════════════════════════════════════════
let GoogleMapComponent = null;

if (HAS_GMAPS_KEY) {
  const {
    GoogleMap, useJsApiLoader, Marker, DirectionsRenderer, InfoWindow,
  } = require('@react-google-maps/api');

  const MAP_STYLES = [
    { featureType: 'poi',               elementType: 'labels',           stylers: [{ visibility: 'off' }] },
    { featureType: 'transit',           elementType: 'labels.icon',      stylers: [{ visibility: 'off' }] },
    { featureType: 'road',              elementType: 'geometry',         stylers: [{ color: '#ffffff' }] },
    { featureType: 'road.highway',      elementType: 'geometry',         stylers: [{ color: '#f0e8d8' }] },
    { featureType: 'water',             elementType: 'geometry',         stylers: [{ color: '#b8d4e8' }] },
    { featureType: 'landscape',         elementType: 'geometry',         stylers: [{ color: '#f5f2ec' }] },
    { featureType: 'landscape.natural', elementType: 'geometry',         stylers: [{ color: '#e8f0e0' }] },
    { featureType: 'administrative',    elementType: 'labels.text.fill', stylers: [{ color: '#444444' }] },
    { featureType: 'road',              elementType: 'labels.text.fill', stylers: [{ color: '#666666' }] },
  ];

  const getColor = (i, total) => {
    if (i === 0)         return '#2d7a4f';
    if (i === total - 1) return '#c9a84c';
    return '#1a6eb5';
  };

  const makeIcon = (num, color, pulse) => ({
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52">
        ${pulse ? `<circle cx="20" cy="18" r="14" fill="${color}" opacity="0.2">
          <animate attributeName="r" from="12" to="22" dur="1.8s" repeatCount="indefinite"/>
          <animate attributeName="opacity" from="0.4" to="0" dur="1.8s" repeatCount="indefinite"/>
        </circle>` : ''}
        <path d="M20 0C9 0 0 9 0 20c0 14 20 32 20 32s20-18 20-32C40 9 31 0 20 0z" fill="${color}"/>
        <circle cx="20" cy="20" r="12" fill="white" opacity="0.3"/>
        <text x="20" y="25" text-anchor="middle" fill="white" font-size="14"
          font-weight="800" font-family="DM Sans,sans-serif">${num}</text>
      </svg>`)}`,
    scaledSize: { width: 40, height: 52 },
    anchor:     { x: 20, y: 52 },
  });

  const Inner = ({ stops }) => {
    const [dirs, setDirs]           = useState([]);
    const [active, setActive]       = useState(null);
    const [loading, setLoading]     = useState(true);
    const mapRef                    = useRef(null);

    const onLoad = useCallback((map) => {
      mapRef.current = map;
      const bounds = new window.google.maps.LatLngBounds();
      stops.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
      map.fitBounds(bounds, 50);

      const svc = new window.google.maps.DirectionsService();
      Promise.all(
        stops.slice(0, -1).map((s, i) =>
          new Promise(res => svc.route({
            origin:      { lat: s.lat,            lng: s.lng },
            destination: { lat: stops[i+1].lat,   lng: stops[i+1].lng },
            travelMode:  window.google.maps.TravelMode.DRIVING,
          }, (r, st) => res(st === 'OK' ? r : null)))
        )
      ).then(results => { setDirs(results.filter(Boolean)); setLoading(false); });
    }, [stops]);

    return (
      <>
        {loading && (
          <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
            <div className="w-9 h-9 rounded-full border-4 border-ocean-blue/20 border-t-ocean-blue animate-spin" />
            <p className="font-sans text-sm text-warm-gray">Loading route...</p>
          </div>
        )}
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          zoom={8}
          center={{ lat: 7.87, lng: 80.77 }}
          options={{ styles: MAP_STYLES, mapTypeControl: false, streetViewControl: false, clickableIcons: false }}
          onLoad={onLoad}
        >
          {dirs.map((d, i) => (
            <DirectionsRenderer key={i} directions={d} options={{
              suppressMarkers: true,
              polylineOptions: { strokeColor: '#1a6eb5', strokeWeight: 5, strokeOpacity: 0.9 },
            }} />
          ))}
          {stops.map((s, i) => (
            <Marker key={i} position={{ lat: s.lat, lng: s.lng }}
              icon={makeIcon(i + 1, getColor(i, stops.length), i === 0)}
              onClick={() => setActive(active?.name === s.name ? null : s)}
            />
          ))}
          {active && (
            <InfoWindow position={{ lat: active.lat, lng: active.lng }}
              onCloseClick={() => setActive(null)}
              options={{ pixelOffset: new window.google.maps.Size(0, -56) }}
            >
              <div style={{ fontFamily: "'DM Sans',sans-serif", padding: '6px 8px', minWidth: '150px' }}>
                <strong style={{ fontSize: '14px', color: '#0d1f35', display: 'block', marginBottom: '4px' }}>
                  {active.name}
                </strong>
                <span style={{ background: '#f7f3ec', color: '#6b6560', fontSize: '11px',
                  fontWeight: 600, padding: '2px 10px', borderRadius: '20px' }}>
                  {typeof active.day === 'number' ? `Day ${active.day}` : `Days ${active.day}`}
                </span>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </>
    );
  };

  GoogleMapComponent = ({ stops }) => {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey: GMAPS_KEY,
      libraries: ['places'],
    });

    if (loadError) return <FallbackMap stops={stops} />;
    if (!isLoaded) return (
      <div className="flex items-center justify-center gap-3 h-full bg-sandy-beige rounded-2xl">
        <div className="w-8 h-8 rounded-full border-4 border-ocean-blue/20 border-t-ocean-blue animate-spin" />
        <p className="font-sans text-sm text-warm-gray">Loading Google Maps...</p>
      </div>
    );
    return <Inner stops={stops} />;
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// LEAFLET FALLBACK VERSION  (used when no Google Maps key)
// ═══════════════════════════════════════════════════════════════════════════
const decodePolyline = (enc) => {
  const pts = []; let i = 0, lat = 0, lng = 0;
  while (i < enc.length) {
    let b, s = 0, r = 0;
    do { b = enc.charCodeAt(i++) - 63; r |= (b & 0x1f) << s; s += 5; } while (b >= 0x20);
    lat += r & 1 ? ~(r >> 1) : r >> 1; s = 0; r = 0;
    do { b = enc.charCodeAt(i++) - 63; r |= (b & 0x1f) << s; s += 5; } while (b >= 0x20);
    lng += r & 1 ? ~(r >> 1) : r >> 1;
    pts.push([lat / 1e5, lng / 1e5]);
  }
  return pts;
};

const fetchRoad = async (a, b) => {
  try {
    const r = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=polyline`
    );
    const d = await r.json();
    if (d.routes?.[0]) return decodePolyline(d.routes[0].geometry);
  } catch {}
  return [[a.lat, a.lng], [b.lat, b.lng]];
};

const getColor = (i, total) => {
  if (i === 0)         return '#2d7a4f';
  if (i === total - 1) return '#c9a84c';
  return '#1a6eb5';
};

const FallbackMap = ({ stops }) => {
  const {
    MapContainer, TileLayer, Marker, Polyline, Popup, useMap,
  } = require('react-leaflet');
  const L = require('leaflet');
  require('leaflet/dist/leaflet.css');

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  const [segments, setSegments] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!stops || stops.length < 2) return;
    Promise.all(stops.slice(0, -1).map((s, i) => fetchRoad(s, stops[i + 1])))
      .then(segs => { setSegments(segs); setLoading(false); });
  }, [stops]);

  const createPin = (num, color, pulse) =>
    L.divIcon({
      className: '',
      html: `<div style="position:relative;width:40px;height:48px;">
        ${pulse ? `<div style="position:absolute;top:-4px;left:-4px;width:48px;height:48px;
          border-radius:50%;background:${color}33;animation:lPulse 2s infinite;"></div>` : ''}
        <div style="width:36px;height:36px;background:${color};border:3px solid white;
          border-radius:50% 50% 50% 0;transform:rotate(-45deg);
          box-shadow:0 3px 12px rgba(0,0,0,0.3);display:flex;align-items:center;
          justify-content:center;position:absolute;top:0;left:2px;">
          <span style="transform:rotate(45deg);color:white;font-weight:800;
            font-size:13px;font-family:'DM Sans',sans-serif;">${num}</span>
        </div></div>`,
      iconSize: [40, 48], iconAnchor: [20, 48], popupAnchor: [0, -52],
    });

  const FitBounds = ({ positions }) => {
    const map = useMap();
    useEffect(() => {
      if (positions.length > 1)
        map.fitBounds(L.latLngBounds(positions), { padding: [50, 50] });
    }, [map, positions]);
    return null;
  };

  const positions = stops.map(s => [s.lat, s.lng]);

  return (
    <>
      <style>{`
        @keyframes lPulse {
          0%  { transform:scale(1);   opacity:.7; }
          70% { transform:scale(2);   opacity:0; }
          100%{ transform:scale(2);   opacity:0; }
        }
        .leaflet-popup-content-wrapper {
          border-radius:14px!important;
          box-shadow:0 8px 28px rgba(0,0,0,.15)!important;
          padding:0!important; overflow:hidden; border:none!important;
        }
        .leaflet-popup-content { margin:0!important; width:auto!important; }
        .leaflet-popup-tip-container { display:none; }
      `}</style>

      {loading && (
        <div className="absolute inset-0 z-[1000] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3 rounded-2xl">
          <div className="w-9 h-9 rounded-full border-4 border-ocean-blue/20 border-t-ocean-blue animate-spin" />
          <p className="font-sans text-sm text-warm-gray">Loading road route...</p>
        </div>
      )}

      <MapContainer center={[7.87, 80.77]} zoom={7}
        style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <FitBounds positions={positions} />

        {segments.map((seg, i) => (
          <React.Fragment key={i}>
            <Polyline positions={seg}
              pathOptions={{ color: '#000', weight: 6, opacity: 0.1, lineCap: 'round' }} />
            <Polyline positions={seg}
              pathOptions={{ color: '#1a6eb5', weight: 4, opacity: 0.9, lineCap: 'round' }} />
            <Polyline positions={seg}
              pathOptions={{ color: 'white', weight: 1.5, opacity: 0.5, dashArray: '1 10' }} />
          </React.Fragment>
        ))}

        {stops.map((s, i) => (
          <Marker key={i} position={[s.lat, s.lng]}
            icon={createPin(i + 1, getColor(i, stops.length), i === 0)}>
            <Popup>
              <div style={{ padding: '12px 16px', minWidth: '160px', fontFamily: "'DM Sans',sans-serif" }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%',
                    background: getColor(i, stops.length), color: 'white',
                    fontWeight: 800, fontSize: '11px', display: 'flex',
                    alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
                  <strong style={{ fontSize: '14px', color: '#0d1f35' }}>{s.name}</strong>
                </div>
                <span style={{ background: '#f7f3ec', color: '#6b6560', fontSize: '11px',
                  fontWeight: 600, padding: '2px 10px', borderRadius: '20px', display: 'inline-block' }}>
                  {typeof s.day === 'number' ? `Day ${s.day}` : `Days ${s.day}`}
                </span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT — auto-selects Google Maps or Leaflet fallback
// ═══════════════════════════════════════════════════════════════════════════
const TourRouteMap = ({ stops }) => {
  if (!stops || stops.length === 0) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100" style={{ height: '500px' }}>
      {HAS_GMAPS_KEY && GoogleMapComponent
        ? <GoogleMapComponent stops={stops} />
        : <FallbackMap stops={stops} />
      }
    </div>
  );
};

export default TourRouteMap;
