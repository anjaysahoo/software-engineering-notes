function ComputeAmount(amount){
    this.totalAmount = amount;

    this.lac = function (multiplier){
        this.totalAmount += multiplier*100000;
        return this;
    }

    this.value = () => {
        return this.totalAmount;
    }
}

const computeAmount = new ComputeAmount(0).lac(2).lac(2).value();
console.log("computeAmount:", computeAmount);
