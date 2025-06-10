import axios from 'axios';

const API_BASE_URL = 'https://corsproxy.io/?https://clicks.aweber.com/y/ct/?l=SoDoKn&m=8kKiA5Xs4lyuOBlr&b=LN4zdPOCY2wffjE5vH.B0w';

// Function to fetch skip options based on postcode and area
export const fetchSkipsByLocation = async (postcode, area) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      params: { postcode, area },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching skips:', error);
    throw error;
  }
};