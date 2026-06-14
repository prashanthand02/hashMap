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
            size++;
            buckets[index] = newNode;
            
        } else if (buckets[index].key === key) {
            buckets[index].value = value;

        } else if (buckets[index].key !== key) {
            buckets[index].nextNode = newNode;
            size++;
        };

        let loadLevels = capacity * loadFactor
        if (size > loadLevels) {
            growSize();
        };

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

    function has(key) {
        if (typeof key !== typeof "String") {
            throw new TypeError(`Key type can only be of string.`)
        };

        let value = false;
        for (let i = 0; i < buckets.length; i++) {
            let currNode = buckets[i];

            if (!buckets[i]) continue;
            
            while (currNode !== null) {
                if (currNode.key === key) {
                    value = true;
                };
                currNode = currNode.nextNode;
            };
        };
        return value;
    };

    function remove(key) {
        for (let i = 0; i < buckets.length; i++) {
            let currNode = buckets[i];
        };

        let value = false;
        
        for (let i = 0; i < buckets.length; i++) {
            let currNode = buckets[i];

            if (!buckets[i]) continue;

            if (buckets[i].key === key) {
                buckets[i] = buckets[i].nextNode || undefined;
                size--;
                value = true;
            }
            
            while (currNode !== null) {
                if (currNode.nextNode && currNode.nextNode.key === key) {
                    value = true;
                    currNode.nextNode = currNode.nextNode.nextNode !== null ? currNode.nextNode.nextNode : undefined;
                    size--;
                };
                currNode = currNode.nextNode;
            };
        };
        return value;
        
    };

    function length() {
        return size;
    };

    function clear() {
        for (let i = 0; i < buckets.length; i++) {
            if (!buckets[i]) continue;

            let currNode = buckets[i];

            while (currNode !== null) {
                size--;
                currNode = currNode.nextNode;
            };
        };
    };

    function keys() {
        const keysArr = [];

        for (let i = 0; i < buckets.length; i++) {
            if (!buckets[i]) continue;

            let currNode = buckets[i];

            while (currNode !== null) {
                keysArr.push(currNode.key);
                currNode = currNode.nextNode;
            };
        };

        return keysArr;
    };

    function values() {
        const valuesArr = [];

        for (let i = 0; i < buckets.length; i++) {
            if (!buckets[i]) continue;

            let currNode = buckets[i];

            while (currNode !== null) {
                valuesArr.push(currNode.value);
                currNode = currNode.nextNode;
            };
        };

        return valuesArr;
    }; 

    function entries() {
        const entriesArr = [];

        for (let i = 0; i < buckets.length; i++) {
            if (!buckets[i]) continue;

            let currNode = buckets[i];

            while (currNode !== null) {
                entriesArr.push([currNode.key ,currNode.value]);
                currNode = currNode.nextNode;
            };
        };

        return entriesArr;
    };
    
    return {
        set, get, has, remove, length, clear, keys, values, entries
    }
};

let test = HashMap();
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
test.set('moon', 'silver');

