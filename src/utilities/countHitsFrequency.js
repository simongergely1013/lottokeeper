const countHitsFrequency = (arr) => {
    const frequency = {};
    for (let i = 0; i < arr.length; i++) {
      const num = arr[i];
      if (frequency[num]) {
        frequency[num] += 1;
      } else {
        frequency[num] = 1;
      }
    }
      return frequency;
    }

export default countHitsFrequency;