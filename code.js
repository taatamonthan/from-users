var products = [
    {
        id: 1,
        name: 'Bird Ramsey',
        description: 'Superheroic JavaScript MVW Framework.',
        email: 'birdramsey@nimon.com'
    },
    {
        id: 2,
        name: 'Lillian Burgess',
        description: 'A framework for creating ambitious web applications.',
        email: 'lillianburgess@luxuria.com'
    },
    {
        id: 3,
        name: 'Kristie Cole',
        description: 'A JavaScript Library for building user interfaces.',
        email: 'kristiecole@quadeebo.com'
    }
    
    
    
       
];

function findProduct(productId) {
    return products[findProductKey(productId)];
};

function findProductKey(productId) {
    for (var key = 0; key < products.length; key++) {
        if (products[key].id == productId) {
            return key;
        }
    }
};

var List = Vue.extend({
    template: '#product-list',
    data: function () {
        return {
            products: products,
            searchKey: ''
        };
    },
    computed: {
        filteredProducts() {
            return this.products.filter((product) => {
                return product.name.indexOf(this.searchKey) > -1
                //return !product.name.indexOf(this.searchKey)
            })
        }
    }
});

var Product = Vue.extend({
    template: '#product',
    data: function () {
        return {
            product: findProduct(this.$route.params.product_id)
        };
    }
});

var ProductEdit = Vue.extend({
    template: '#product-edit',
    data: function () {
        return {
            product: findProduct(this.$route.params.product_id),
            email: {
                valid: true
            }
        };
    },
    methods: {
        updateProduct: function () {
            //Obsolete, product is available directly from data...
            let product = this.product; //var product = this.$get('product');
            products[findProductKey(product.id)] = {
                id: product.id,
                name: product.name,
                description: product.description,
                email: product.email

            };
            router.push('/');
        },

        validate: function (type, value) {
            if (type === "email") {
                this.email.valid = this.isEmail(value) ? true : false;
            }
        },
        // check for valid email adress
        isEmail: function (value) {
            return emailRegExp.test(value);
        },
    },
    watch: {
        // watching nested property
        "email.value": function (value) {
            this.validate("email", value);
        }
    }



});

var ProductDelete = Vue.extend({
    template: '#product-delete',
    data: function () {
        return {
            product: findProduct(this.$route.params.product_id)
        };
    },
    methods: {
        deleteProduct: function () {
            products.splice(findProductKey(this.$route.params.product_id), 1);
            router.push('/');
        }
    }
});

var AddProduct = Vue.extend({
    template: '#add-product',
    data: function () {
        return {
            product: {
                name: '',
                description: '',
                email: ''
            },
            email: {
                valid: true
            }
        }
    },
    methods: {
        createProduct: function () {
            //Obsolete, product is available directly from data...
            let product = this.product; //var product = this.$get('product');
            products.push({
                id: Math.random().toString().split('.')[1],
                name: product.name,
                description: product.description,
                email: product.email

            });
            router.push('/');
        },
        validate: function (type, value) {
            if (type === "email") {
                this.email.valid = this.isEmail(value) ? true : false;
            }
        },
        // check for valid email adress
        isEmail: function (value) {
            return emailRegExp.test(value);
        },
    },
    watch: {
        // watching nested property
        "email.value": function (value) {
            this.validate("email", value);
        }
    }




});

var router = new VueRouter({
    routes: [
        {
            path: '/',
            component: List
        },
        {
            path: '/product/:product_id',
            component: Product,
            name: 'product'
        },
        {
            path: '/add-product',
            component: AddProduct
        },
        {
            path: '/product/:product_id/edit',
            component: ProductEdit,
            name: 'product-edit'
        },
        {
            path: '/product/:product_id/delete',
            component: ProductDelete,
            name: 'product-delete'
        }
	]
});


var App = {}

new Vue({
    router
}).$mount('#app')
