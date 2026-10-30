/* Shared source data for Studio and server. Values are illustrative/reference and may be incomplete. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FBTFoodCatalog=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
const catalog={
cola:{name:'Cola (regular, 330 ml)',unit:'can',units:{can:1},serving:'330 ml',sugar:35,kcal:139,sodium:null,kind:'drink',source:'https://www.coca-cola.com/kz/ru/about-us/faq/how-much-sugar-is-contained-in-the-coca-cola-can'},
colaZero:{name:'Cola (zero sugar, 330 ml)',unit:'can',units:{can:1},serving:'330 ml',sugar:0,kcal:1,sodium:null,kind:'drink',source:'https://www.coca-cola.com/'},
energy:{name:'Energy drink (regular, 250 ml; reference)',unit:'can250',units:{can250:1,ml100:.4},serving:'250 ml',sugar:27.5,kcal:115,sodium:100,kind:'drink',source:'https://www.redbull.com/gb-en/energydrink/products/red-bull-energy-drink-ingredients-list'},
energySugarfree:{name:'Energy drink (sugar-free, 250 ml; illustrative)',unit:'can250',units:{can250:1,ml100:.4},serving:'250 ml',sugar:0,kcal:null,sodium:null,kind:'drink',source:'https://www.redbull.com/gb-en/energydrink/products/red-bull-energy-drink-ingredients-list'},
orangeJuice:{name:'Orange juice (100 ml; generic)',unit:'ml100',units:{ml100:1,glass250:2.5},serving:'100 ml',sugar:8.4,kcal:45,sodium:null,kind:'drink',source:'https://fdc.nal.usda.gov/'},
appleJuice:{name:'Apple juice (100 ml; generic)',unit:'ml100',units:{ml100:1,glass250:2.5},serving:'100 ml',sugar:10,kcal:46,sodium:null,kind:'drink',source:'https://fdc.nal.usda.gov/'},
water:{name:'Water (250 ml)',unit:'glass250',units:{glass250:1,ml100:.4},serving:'250 ml',sugar:0,kcal:0,sodium:null,kind:'drink',source:'https://fdc.nal.usda.gov/'},
coffee:{name:'Black coffee, unsweetened (100 ml)',unit:'ml100',units:{ml100:1,glass250:2.5},serving:'100 ml',sugar:0,kcal:1,sodium:null,kind:'drink',source:'https://fdc.nal.usda.gov/'},
milk:{name:'Whole milk (100 ml; generic)',unit:'ml100',units:{ml100:1,glass250:2.5},serving:'100 ml',sugar:4.8,kcal:61,sodium:null,kind:'drink',source:'https://fdc.nal.usda.gov/'},
salt:{name:'Table salt',unit:'g',units:{g:1,tsp:6,tbsp:18},serving:'1 g',sugar:0,kcal:0,sodium:400,kind:'salt',source:'https://www.who.int/news-room/fact-sheets/detail/sodium-reduction'},
sugar:{name:'Granulated sugar',unit:'g',units:{g:1,tsp:4,tbsp:12},serving:'1 g',sugar:1,kcal:3.87,sodium:0,kind:'sugar',source:'https://fdc.nal.usda.gov/'},
burger:{name:'Cheeseburger (100 g; generic)',unit:'100g',units:{'100g':1},serving:'100 g',sugar:3,kcal:296,sodium:440,kind:'mixed',source:'https://getfoodfacts.com/food/cheeseburger-from-fast-food-1-medium-patty-2706897'},
fries:{name:'French fries (60 g; generic)',unit:'cup',units:{cup:1},serving:'60 g',sugar:.2,kcal:135,sodium:177,kind:'mixed',source:'https://getfoodfacts.com/food/potato-french-fries-nfs-2709456'},
pizza:{name:'Pizza (100 g; generic estimate)',unit:'100g',units:{'100g':1},serving:'100 g',sugar:3.6,kcal:266,sodium:null,kind:'mixed',source:'https://fdc.nal.usda.gov/'},
chips:{name:'Potato chips (100 g; generic estimate)',unit:'100g',units:{'100g':1},serving:'100 g',sugar:0.5,kcal:536,sodium:null,kind:'mixed',source:'https://fdc.nal.usda.gov/'},
chocolate:{name:'Milk chocolate (100 g; generic estimate)',unit:'100g',units:{'100g':1},serving:'100 g',sugar:52,kcal:535,sodium:null,kind:'mixed',source:'https://fdc.nal.usda.gov/'},
icecream:{name:'Vanilla ice cream (100 g; generic estimate)',unit:'100g',units:{'100g':1},serving:'100 g',sugar:21,kcal:207,sodium:null,kind:'mixed',source:'https://fdc.nal.usda.gov/'},
cookies:{name:'Cookies (100 g; generic estimate)',unit:'100g',units:{'100g':1},serving:'100 g',sugar:28,kcal:480,sodium:null,kind:'mixed',source:'https://fdc.nal.usda.gov/'},
balanced:{name:'Balanced meal (illustrative scenario)',unit:'meal',units:{meal:1},serving:'one varied meal; composition unspecified',sugar:null,kcal:null,sodium:null,kind:'balanced',source:'https://www.who.int/news-room/fact-sheets/detail/healthy-diet'},
egg:{name:'Boiled egg (1 large; generic)',unit:'egg',units:{egg:1},serving:'one large egg',sugar:.6,kcal:78,sodium:null,kind:'meal',source:'https://fdc.nal.usda.gov/'},
bread:{name:'White bread (100 g; generic estimate)',unit:'100g',units:{'100g':1},serving:'100 g',sugar:5,kcal:265,sodium:null,kind:'meal',source:'https://fdc.nal.usda.gov/'}
};
const unitNames={g:'grams',tsp:'teaspoons (est.)',tbsp:'tablespoons (est.)',can:'cans · 330 ml',can250:'cans · 250 ml',ml100:'100 ml portions',glass250:'glasses · 250 ml','100g':'100 g portions',cup:'cups · 60 g',egg:'large eggs',meal:'example meals'};

return Object.freeze({catalog:Object.freeze(catalog),unitNames:Object.freeze(unitNames)});
});
