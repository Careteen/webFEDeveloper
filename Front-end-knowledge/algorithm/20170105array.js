// 1、判断数组中是否有相同的元素

function isRepeat(arr){
	var hash={};
	if(arr.length>0){
		for(var i=0,len=arr.length;i<len;i++){
			if(hash[arr[i]]){
				return true;
			}
			hash[arr[i]]=true;
		}
	}
	return false;
}
console.log(isRepeat([1,2,3,4]));

// 2、计算一个数组中每个元素在数组中出现的次数
function arrElementCount(arr){
	var result=[];
	for(var i=0,ilen=arr.length;i<ilen;i++){
		var temp =arr[i];
		var count =0;
		for(var j=0,jlen=arr.length;j<jlen;j++){
			if(temp==arr[j]){
				count++;
				arr[j]=-1;
			}
		}
		result.push(temp+':'+count);
	}
	return result;
}
console.log(arrElementCount([1,2,3,4,5,6,7,2,4,6,7,3,5,6,6,7,7]));

function arrElementCount2(arr){
	var hash={};
	var result=[];
	for(var i=0,len=arr.length;i<len;i++){
		if(hash[arr[i]]){
			hash[arr[i]]+=1;
		}else{
			hash[arr[i]]=1;
		}
	}
	Object.keys(hash).map(function(item,index){
		result.push(parseInt(item));
	});
	return result;
}
console.log(arrElementCount2([1,2,3,4,5,6,7,2,4,6,7,3,5,6,6,7,7]))