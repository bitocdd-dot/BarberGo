let watchId = null;

export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject("GPS não suportado");
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => reject(err)
    );
  });
};

export const watchLocation = (callback) => {
  if (!navigator.geolocation) return;

  watchId = navigator.geolocation.watchPosition((pos) => {
    callback({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    });
  });
};

export const stopWatching = () => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
};
