var findMedianSortedArrays = function (nums1, nums2) {
    var tag = nums2.length - 1,
        i = nums1.length,
        total = tag + i + 1;
    if (i === 0) nums1 = nums2;
    else {
        while (i-- >= 0 && tag >= 0) {
            if (nums1[i] < nums2[tag]) {
                nums1.splice(i + 1, 0, nums2[tag]);
                i++;
                tag--;
            }
        }
        if (tag !== -1) {
            nums2.splice(++tag);
            nums1.unshift.apply(nums1, nums2);
        }
    }
    if (total % 2 === 1) return nums1[Math.floor(total / 2)];
    return (nums1[Math.floor(total / 2) - 1] + nums1[Math.floor(total / 2)]) / 2;
};
