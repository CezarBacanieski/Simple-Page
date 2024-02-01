const weatherAPIKey = '126663622bb8a1b8a42d9a5d5fed5d37'
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`
// Menu Section

const galleryImages = [
    {
        src: './assets/gallery/image1.jpg',
        alt: 'Thumbnail Image 1'
    },
    {
        src: './assets/gallery/image2.jpg',
        alt: 'Thumbnail Image 2'
    },
    {
        src: './assets/gallery/image3.jpg',
        alt: 'Thumbnail Image 3'
    },
]

const products = [
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ]

function menuHandler() {
    document.querySelector('#open-nav-menu').addEventListener("click", function () {
        document.querySelector('header nav .wrapper').classList.add('nav-open')
    })
    
    document.querySelector('#close-nav-menu').addEventListener("click", function () {
        document.querySelector('header nav .wrapper').classList.remove('nav-open')
    })
    
}

function celsiusToFahr(temperature) {
    let fahr = (temperature * 9 / 5) + 32
    return fahr
}

// greeting Section

function greetingHandler() {
    let currentHour = new Date().getHours()
    let greeting
    
    if (currentHour >= 6 & currentHour < 12) {
        greeting = 'Good morning'
    }
    else if (currentHour >= 12 & currentHour < 18) {
        greeting = 'Good Afeternoon'
    }
    else {
        greeting = 'Good Evening'
    }
    return greeting
}
document.getElementById("greeting").innerText = greetingHandler();

// Client position section
function weatherHandler() {
    navigator.geolocation.getCurrentPosition(function(position){
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        let weatherURL = weatherAPIURL
            .replace('{lat}', latitude)
            .replace('{lon}', longitude)
            .replace('{API key}', weatherAPIKey)
        fetch(weatherURL)
        .then(response => response.json())
        .then(data => {
            const condition = data.weather[0].description
            const location = data.name
            const temperature = data.main.temp
            
            let celsiusText = `The weather is ${condition} in ${location} and it's ${temperature.toFixed(1)}C outside.`
            let fahrText = `The weather is ${condition} in ${location} and it's ${celsiusToFahr(temperature).toFixed(1)}F outside.`
            
            
            document.querySelector('p#weather').innerHTML = celsiusText
            
            
            document.querySelector('.weather-group').addEventListener('click', function(event) {
                if (event.target.id == 'celsius') {
                    document.querySelector('p#weather').innerHTML = celsiusText
                } 
                else {
                    document.querySelector('p#weather').innerHTML = fahrText
                }
            })

        }).catch(err => {
            document.querySelector('p#weather').innerHTML = 'Unable to get the weather info. Try again later.'
        })
    })
}




//local time section
function clockHandler() {
    setInterval(function() {
        let localTime = new Date()
        document.querySelector('span[data-time=hours]').innerHTML = localTime.getHours().toString().padStart(2, '0')
        document.querySelector('span[data-time=minutes]').innerHTML = localTime.getMinutes().toString().padStart(2, '0')
        document.querySelector('span[data-time=seconds]').innerHTML = localTime.getSeconds().toString().padStart(2, '0')
    }, 1000)
}

// gallery section

function galleryHandler() {
    let mainImage = document.querySelector('#gallery > img')
let thumbnails = document.querySelector('#gallery .thumbnails')


mainImage.src = galleryImages[0].src
mainImage.alt = galleryImages[0].alt

galleryImages.forEach(function(image, index) {
    let thumb = document.createElement('img')
    thumb.src = image.src
    thumb.alt = image.alt
    thumb.dataset.arrayIndex = index
    thumb.dataset.selected = false
    console.log(thumb)
    

    if (index === 0) {
        thumb.dataset.selected = true
    } 
    else {
        thumb.dataset.selected = false
    }

    thumb.addEventListener('click', function(event) {
       let selectedIndex = event.target.dataset.arrayIndex
       let selectedImage = galleryImages[selectedIndex]
       mainImage.src = selectedImage.src
       mainImage.alt = selectedImage.alt

       thumbnails.querySelectorAll('img').forEach(function(img) {
        img.dataset.selected = false
       })

       event.target.dataset.selected = true
    })
    thumbnails.appendChild(thumb)
})
}

//Productions section
function populateProducts(productList) {
    let productionsSections = document.querySelector('.products-area')
    productionsSections.textContent = ''


     // Run a loop through the products and create an HTML element ('product-item') for each of them
    productList.forEach(function(product, index) {
        // Create the HTML element for the individual product
        let productElm = document.createElement('div')
        productElm.classList.add('product-item')

        // Create the product image
        let productImage = document.createElement('img')
        productImage.src = product.image
        productImage.alt = 'Image for ' + product.title

        // Create the product details section
        let productDetails = document.createElement('div')
        productDetails.classList.add('product-details')

        // Create product title, author, pricetitle and price
        let productTitle = document.createElement('h3')
        productTitle.classList.add('product-title')
        productTitle.textContent = product.title

        let productAuthor = document.createElement('p')
        productAuthor.classList.add('product-author')
        productAuthor.textContent = product.author

        let priceTitle = document.createElement('p')
        priceTitle.classList.add('price-title')
        priceTitle.textContent = 'Price'

        let productPrice = document.createElement('p')
        productPrice.classList.add('product-price')
        productPrice.textContent = product.price > 0 ? '$' + product.price.toFixed(2) : 'Free' // Boa prática com if ternário

        // Append the product details
        productDetails.append(productTitle)
        productDetails.append(productAuthor)
        productDetails.append(priceTitle)
        productDetails.append(productPrice)

        // Add all child HTML elements of the product
        productElm.append(productImage)
        productElm.append(productDetails)

        // Add complete individual product to the production section
        productionsSections.append(productElm)
    })
}

function productsHandler() {

  
    let freeProducts = products.filter(function(item) {
        return !item.price ||  item.price <= 0
    })
    let paidProducts = products.filter(function(item) {
        return item.price > 0
    })

   populateProducts(products)

    document.querySelector('.products-filter label[for=all] span.product-amount').textContent = products.length
    document.querySelector('.products-filter label[for=paid] span.product-amount').textContent = paidProducts.length
    document.querySelector('.products-filter label[for=free] span.product-amount').textContent = freeProducts.length

    let productsFilter = document.querySelector('.products-filter')
    productsFilter.addEventListener('click', function(event) {
        if (event.target.id === 'all') {
            populateProducts(products)
        }
        else if (event.target.id === 'paid') {
            populateProducts(paidProducts)
        } 
        else if (event.target.id === 'free') {
            populateProducts(freeProducts)
        } 
       
    })
}

// Futter Handler
function footerHandler() {
    let currentYear = new Date().getFullYear()
    document.querySelector('footer').textContent = `© ${currentYear} - All rights reserved`
}



// Page Hold 

menuHandler()
greetingHandler()
weatherHandler()
clockHandler()
galleryHandler()
productsHandler()
footerHandler()
