// function for making the nodes
function nodes(value) {
    const value = value;
    let nextNode = null;
    return {
        value, 
        nextNode
    };
};

// factory function to represent the hashMap 
function HashMap() {
    const loadFactor = 0.75;
    let capacity = 16;
    let buckets = new Array(16);

    function hash(key) {
        let hashCode = 0;
        const primeNum = 31;

        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % capacity;
        };
        
        return hashCode;
    };
};

