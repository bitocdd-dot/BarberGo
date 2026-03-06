let watchId = null;

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position =>
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }),
        error => reject(error),
        { enableHighAccuracy: true }
      );
    } else {
      reject(new Error("Geolocalização não suportada"));
    }
  });
};

export const watchLocation = callback => {
  if (navigator.geolocation) {
    watchId = navigator.geolocation.watchPosition(
      position =>
        callback({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
      error => console.error(error),
      { enableHighAccuracy: true }
    );
  }
};

export const stopWatching = () => {
  if (watchId) navigator.geolocation.clearWatch(watchId);
};

/* AQUI ESTÁ A CORREÇÃO */

export const getNearbyBarbers = (userLocation, barbers) => {
  return barbers.map(b => {
    const dist = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      b.lat,
      b.lng
    );

    return {
      ...b,
      distance: dist.toFixed(1)
    };
  });
};
