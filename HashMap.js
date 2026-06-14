// function for making the nodes
function node(key, value) {
    let nextNode = null;
    return {
        key,
        value, 
        nextNode
    };
};

// factory function to represent the hashMap 
function HashMap() {
    const loadFactor = 0.75;
    let capacity = 16;
    let buckets = new Array(capacity);
    let size = 0;

    function hash(key) {
        let hashCode = 0;
        const primeNum = 31;

        for(let i = 0; i < key.length; i++) {
            hashCode = (primeNum * hashCode + key.charCodeAt(i)) % capacity;
        };
        
        return hashCode;
    };

    function growSize() {
        const oldEntries = entries();
        capacity *= 2;
        buckets = new Array(capacity);
        size = 0;

        for (let [key, value] of oldEntries) {
            set(key, value);
        }
    };

    function set(key, value) {
        const index = hash(key);
        const newNode = node(key, value);

        if (typeof key !== typeof "String") {
            throw new TypeError(`Key type can only be of string.`)
        };

        if (!buckets[index]) {
            buckets[index] = newNode;
        } else if (buckets[index].key === key) {
            buckets[index].value = value;
        } else if (buckets[index].key !== key) {
            buckets[index].nextNode = newNode;
        };
        
        size++;

        // if (entries > capacity * loadFactor) {
        //     growSize();
        // };

    };

    function get(key) {
        if (typeof key !== typeof "String") {
            throw new TypeError(`Key type can only be of string.`)
        };

        let value = null;
        for (let i = 0; i < buckets.length; i++) {
            let currNode = buckets[i];

            if (!buckets[i]) continue;
            
            while (currNode !== null) {
                if (currNode.key === key) {
                    value = currNode.value;
                    return value;
                };
                currNode = currNode.nextNode;
            };
        };
        return value;
    };

    return {
        set, get
    }
};

// let a = HashMap();
// a.set(`name`, `prashanth`);
// a.set(`age`, 17);
// a.set(`age`, 20);
// a.set(`name`, `jayanth`);
// console.log(a.get(`nam`));