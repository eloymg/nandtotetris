var nand = function(a,b){
		if(a==1 && b==1){
			return 0;
		}else{
			return 1;
		}
	}

	var not = function(a){
		return nand(a,a);
	}
	var and = function(a,b){
		return not(nand(a,b));
	}
	var or = function(a,b){
		return nand(nand(a,a),nand(b,b));
	}
    var xor = function(a,b){
    	o_nand1=nand(a,b);
    	o_nand2=nand(a,o_nand1);
    	o_nand3=nand(b,o_nand1);
    	return nand(o_nand2,o_nand3);
    }
    var mux = function(a,b,sel){
    	o_and1=and(a,not(sel));
    	o_and2=and(b,sel);
    	return or(o_and1,o_and2);
    }
    var dmux = function(j,sel){

    	out1 = and(j,not(sel));
    	out2 = and(j,sel);
    	return [out1,out2]
    }
    var not16 = function(a){
    	if(a.length!=16){
    		return undefined
    	}
    	res = new Array(16);
    	for(i=0;i<16;i++){
    		res[i]=not(a[i])
    	}
    	return res
    }
    var or16 = function(a,b){
    	if(a.length!=16 && b.length!=16){
    		return undefined
    	}
    	res = new Array(16);
    	for(i=0;i<16;i++){
    		res[i]=or(a[i],b[i])
    	}
    	return res
    }
    var and16 = function(a,b){
    	if(a.length!=16 && b.length!=16){
    		return undefined
    	}
    	res = new Array(16);
    	for(i=0;i<16;i++){
    		res[i]=and(a[i],b[i])
    	}
    	return res
    }
    var mux16 = function(a,b,sel){
    	if(a.length!=16 && b.length!=16){
    		return undefined
    	}
    	res = new Array(16);
    	for(i=0;i<16;i++){
    		res[i]=mux(a[i],b[i],sel)
    	}
    	return res
    }
    var dmux16 = function(j,sel){
    	if(j.length!=16){
    		return undefined
    	}
    	res = [new Array(16),new Array(16)];
    	for(i=0;i<16;i++){
    		res[0][i]=dmux(j[i],sel)[0]
    		res[1][i]=dmux(j[i],sel)[1]
    	}
    	return res
    }
    var or8way = function(j){
    	if(j.length!=8){
    		return undefined
    	}
    	res=0;
    	for(i=0;i<8;i++){
    		res=or(j[i],res)
    	}
    	return res;
    }
    var mux4way16 = function(a,b,c,d,sel){	
    	o_mux1=mux16(a,b,sel[1]);
    	o_mux2=mux16(c,d,sel[1]);
    	return mux16(o_mux1,o_mux2,sel[0]);
    }
    var dmux4way = function(j,sel){	
    	res2 = new Array(4);
    		res2[0]=dmux(j,not(and(not(sel[0]),not(sel[1]))))[0]
    		res2[1]=dmux(j,and(not(sel[0]),sel[1]))[1]
    		res2[2]=dmux(j,not(and(sel[0],not(sel[1]))))[0]
    		res2[3]=dmux(j,and(sel[1],sel[0]))[1]  	
    	return res2
    }
    var mux8way16 = function(a,b,c,d,e,f,g,h,sel){	
    	o_mux16_1=mux4way16(a,b,c,d,sel.slice(1,3));
    	o_mux16_2=mux4way16(e,f,g,h,sel.slice(1,3));
    	return mux16(o_mux16_1,o_mux16_2,sel[0]);
    }
    var dmux8way = function(j,sel){
        
        res2 = new Array(8).fill(0);
        if(sel[0] == 0){
            res2[0]=dmux(j,not(and(not(sel[1]),not(sel[2]))))[0]
            res2[1]=dmux(j,and(not(sel[1]),sel[2]))[1]
            res2[2]=dmux(j,not(and(sel[1],not(sel[2]))))[0]
            res2[3]=dmux(j,and(sel[2],sel[1]))[1]
        }
        if(sel[0] == 1){
            res2[4]=dmux(j,not(and(not(sel[1]),not(sel[2]))))[0]
            res2[5]=dmux(j,and(not(sel[1]),sel[2]))[1]
            res2[6]=dmux(j,not(and(sel[1],not(sel[2]))))[0]
            res2[7]=dmux(j,and(sel[2],sel[1]))[1]
        }

        return res2
    }