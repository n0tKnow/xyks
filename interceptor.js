console.log("Script loaded successfully ");
var sum = 0;
Java.perform(function () {
    var d2Class = Java.use('com.fenbi.android.leo.exercise.data.d2');

    d2Class.setCostTime.implementation = function (time) {
        var randomTime = Math.floor(Math.random() * (213 - 205 + 1)) + 205;
        console.log("Modified d2 time (random): " + randomTime);
        sum += randomTime
        // call orig
        this.setCostTime(randomTime);
    };


    // Hook the p1 class
    var p1Class = Java.use('com.fenbi.android.leo.exercise.data.p1');

    // Hook the constructor of the class
    p1Class.$init.overload(
        'java.lang.String',  // idString
        'java.lang.String',  // trialExamId
        'int',               // keypointId
        'int',               // ruleType
        'int',               // questionCnt
        'int',               // correctCnt
        'long',              // costTime
        'long',              // updatedTime
        'java.lang.String',  // keypoint
        'int',               // source
        'int'                // orionKeypointId
    ).implementation = function (idString, trialExamId, keypointId, ruleType, questionCnt, correctCnt, costTime, updatedTime, keypoint, source, orionKeypointId) {

        // Generate random costTime value between 70 and 120
        var randomCostTime = sum ;
        // reset
        sum = 0
        console.log("Original costTime: " + costTime);
        console.log("Modified costTime: " + randomCostTime);
        // Call the original constructor with modified costTime
        return this.$init(idString, trialExamId, keypointId, ruleType, questionCnt, correctCnt, randomCostTime, updatedTime, keypoint, source, orionKeypointId);
    };
});