const prod = {
  isTracking: {
    TRACKING: true
  }
};

const dev = {
  isTracking: {
    TRACKING: false
  }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
export const TRACKING_GA = 'UA-169842050-1';
export const TRACKING_GA_TEST = 'TEST-000000000-1';