const cars = [{
        id: 1,
        name: 'Peugot 208',
        description: 'Petite citadine parfaite à tout faire, idéal pour la ville et les moyens trajets',
        image: 'https://s1.qwant.com/thumbr/0x380/2/d/8efb6ae3e5b9873595db3b3e7b8d5a6ad8ae45f653b8214df1529813c79dd5/2020-Peugeot_208-1.jpeg?u=https%3A%2F%2Fcarsmakers.com%2Fuploads%2Fcar%2Fcarimage%2F342%2F2020-Peugeot_208-1.jpeg&q=0&b=1&p=0&a=1',
        price: 55
    },
    {
        id: 2,
        name: 'BMW serie 1',
        description: 'Compacte faite pour la route mais aussi la ville avec son confort et sa qualité allemande',
        image: 'https://s2.qwant.com/thumbr/0x380/4/a/f15023cae668bb68e3d1c8d55338617fb9131a4e1a2c42193a3541fe44530c/BMW-1-Series--F20--LCI-6006_26.jpg?u=https%3A%2F%2Fs1.cdn.autoevolution.com%2Fimages%2Fgallery%2FBMW-1-Series--F20--LCI-6006_26.jpg&q=0&b=1&p=0&a=1',
        price: 75
    },
    {
        id: 3,
        name: 'Mercedes-benz classe C',
        description: 'Petite berline familliale parfaite pour 2 adultes et 2 enfants',
        image: 'https://s2.qwant.com/thumbr/0x0/f/e/d5d577fb36e1dc0a63ea40c4e7312d30f409018969294e37910b4f84364d2b/Mercedes-Benz-C-Class-2018-965996.jpg?u=https%3A%2F%2Fcdn.images.express.co.uk%2Fimg%2Fdynamic%2F24%2F590x%2FMercedes-Benz-C-Class-2018-965996.jpg%3Fr%3D1534926507468&q=0&b=1&p=0&a=1',
        price: 80
    },
    {
        id: 4,
        name: 'Volvo XC60',
        description: 'SUV suedois bon à tout faire, agile en ville mais aussi puissant et confortable pour des longs trajets',
        image: 'https://s2.qwant.com/thumbr/0x380/7/c/8ea27f9709a4ef469b11fadece9e9e7c91860bd5e9a6cd2fe49d57daa75388/2018-Volvo-XC60-T6-Inscription-front-three-quarter-02.jpg?u=http%3A%2F%2Fst.motortrend.com%2Fuploads%2Fsites%2F10%2F2017%2F03%2F2018-Volvo-XC60-T6-Inscription-front-three-quarter-02.jpg&q=0&b=1&p=0&a=1s://www.cdiscount.com/pdt2/8/3/8/1/300x300/auc5900168932838/rw/hypermotion-trottinette-rockster-charge-max-100-k.jpg',
        price: 90
    },
    {
        id: 5,
        name: 'Alpine A110',
        description: 'Sportive made in france comme on les aime',
        image: 'https://s2.qwant.com/thumbr/0x380/6/2/2b3e8f4074e63b352d5002044da15e690b54753bef9c39ef967eed4e60f279/a110(100).jpg?u=https%3A%2F%2Fparkers-images.bauersecure.com%2Fgallery-image%2Fpagefiles%2F257193%2Fdriving-moving-exterior%2F1752x1168%2Fa110%28100%29.jpg&q=0&b=1&p=0&a=1',
        price: 100
    },
    {
        id: 6,
        name: 'Porsche 911',
        description: 'Quoi de mieux quune sportive parfaite pour rouler tout les jours et se faire plaisir en la conduisant',
        image: 'https://s2.qwant.com/thumbr/0x380/c/3/1fddf279d26204359ec2241abd38d66ea397f716e3a8ffc385b680a0c0acaf/maxresdefault.jpg?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2F_ASmNIC0aRY%2Fmaxresdefault.jpg&q=0&b=1&p=0&a=1g',
        price: 130
    },
    {
        id: 7,
        name: 'Peugeot 2008',
        description: 'Crossover agile en ville, en tout terrrain mais aussi sur autoroute, le haut de gamme à la française',
        image: 'https://s1.qwant.com/thumbr/0x380/2/f/8fc5be6c512e7bf3722197f78de73d1125208fd88bde2fbb5b8f6e1539abf5/Peugeot-2008-%20(4).jpg?u=https%3A%2F%2Fimg-ik.cars.co.za%2Fimages%2F2019%2F6%2FPeugeot-2008%2Ftr%3An-news_1200x%2FPeugeot-2008-%2520%284%29.jpg&q=0&b=1&p=0&a=1',
        price: 80
    },
    {
        id: 8,
        name: 'Renault Mégane',
        description: 'Berline compacte française de taille de parfaite en terme de confort',
        image: 'https://s2.qwant.com/thumbr/700x0/5/f/ef4acd3e58ee77a4049737dd2c3213743bb5cc28247840e32b4f2c8d8244c6/2017-renault-megane-gt-8.jpg?u=http%3A%2F%2Fs3.caradvice.com.au%2Fwp-content%2Fuploads%2F2017%2F01%2F2017-renault-megane-gt-8.jpg&q=0&b=1&p=0&a=1',
        price: 65
    },
    {
        id: 9,
        name: 'Renault Clio',
        description: 'Concurente direct de la 208, elle a les même qualités',
        image: 'https://s1.qwant.com/thumbr/0x380/0/5/662c01199fcc86546c6b908f3bf1def4f391c417032a0f01791016e5d3eee7/renault-clio-2019-01_1.jpg?u=https%3A%2F%2Fwww.autozeitung.de%2Fassets%2Ffield%2Fimages%2Frenault-clio-2019-01_1.jpg&q=0&b=1&p=0&a=1',
        price: 55
    },
    {
        id: 10,
        name: 'Peugeot 308',
        description: "un cran au dessus de la 208, c'est la concurrente de la megane de chez renault!",
        image: 'https://www.cdiscount.com/pdt2/3/4/2/1/300x300/https://s2.qwant.com/thumbr/0x380/7/c/8b54bc1cb8ab1d625432150acd29f839c57fcd44ebbe0cc6a68b1ec5e7f43e/2015-Peugeot-308-GT-1.jpg?u=http%3A%2F%2Fresources.carsguide.com.au%2Fstyles%2Fcg_hero_large%2Fs3%2F2015-Peugeot-308-GT-1.jpg&q=0&b=1&p=0&a=1/rw/recuperateur-eau-de-pluie-%C3%B8-80-mm.jpg',
        price: 65
    }
]

module.exports = cars