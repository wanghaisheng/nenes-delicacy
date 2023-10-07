const nums1 = [3]
const nums2 = [-2,-1]

const findMedianSortedArrays = (nums1, nums2) => {

    let maxNum = nums1;
    let minNum = nums2;

    if (nums2.length > nums1.length) {
      maxNum = nums2; 
      minNum = nums1;
    }

    console.log(maxNum, minNum)

    for (i of minNum) {
      maxNum.push(i)
    }

    
    maxNum.sort()
    console.log(maxNum)
    
    
    if (maxNum.length % 2 == 0) {
      median = maxNum.length / 2
      
      return (maxNum[median] + maxNum[median - 1]) / 2
    }

    return maxNum[Math.floor(maxNum.length / 2)]
};


console.log(findMedianSortedArrays(nums1, nums2))