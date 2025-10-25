class TreeNode{
    constructor(val) {
        this.value = val;
        this.children = [];
    }

    addChild(child){
        this.children.push(child);
    }

    print(prefix = ' '){
        console.log(prefix + this.value);
        this.children.forEach((child) => child.print(prefix + ' '));
    }
}


class Hierarchy{
    constructor() {
        this.node = {};
        this.root = null;
    }

    addRelationship(child, parent){
        if(!this.node[child]){
            this.node[child] = new TreeNode(child);
        }

        if(!this.node[parent]){
            this.node[parent] = new TreeNode(parent);
        }

        this.node[parent].addChild(this.node[child]);

        /* Here we are trying to get the root of the tree,
        if there is no root then we assign the current parent, or
         if the current root is equal to the child, then we need to update
        our root with its parent
        */
        if(!this.root || this.root === this.node[child]){
            this.root = this.node[parent];
        }
    }


    printHierarchy(){
        if(this.root){
            this.root.print();
        }
        else{
            console.log("No tree possible");
        }
    }
}


// Example Usage
const hierarchy = new Hierarchy();
hierarchy.addRelationship('dog', 'mammal');
hierarchy.addRelationship('cat', 'mammal');
hierarchy.addRelationship('mammal', 'animal');
hierarchy.addRelationship('whitesheep', 'sheep');
hierarchy.addRelationship('shark', 'fish');
hierarchy.addRelationship('fish', 'animal');
hierarchy.addRelationship('sheep', 'mammal');
hierarchy.addRelationship('sparrow', 'bird');
hierarchy.addRelationship('blacksheep', 'sheep');

hierarchy.printHierarchy();
