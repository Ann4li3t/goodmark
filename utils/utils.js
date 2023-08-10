import path from 'path';

const interleaveArrays = (array1, array2) => {
    const resultArray = [];
    const minLength = Math.min(array1.length, array2.length);
  
    for (let i = 0; i < minLength; i++) {
      resultArray.push(array1[i]);
      resultArray.push(array2[i]);
    }
  
    if (array1.length > minLength) {
      resultArray.push(...array1.slice(minLength));
    } else if (array2.length > minLength) {
      resultArray.push(...array2.slice(minLength));
    }
  
    return resultArray;
}

const isPngImage = (imageUrl) => {
  const fileExtension = path.extname(new URL(imageUrl).pathname);
  return fileExtension.toLowerCase() === '.png';
};
const colors = ['#EAB843', '#EC8572', '#C83E36', '#C83E36', '#55928D', '#552B9A', '#91C2D6'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];    
};

export {
  interleaveArrays,
  isPngImage,
  getRandomColor
}
