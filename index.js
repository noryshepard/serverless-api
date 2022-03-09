addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const corsHeaders = {
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Origin': '*'
}

const getImages = async request => {
  const { query }  = await request.json()
  
  const CLIENT_ID = "FW7V8w3_6MqBlS-aTTf4mblUoSruSIWlvtHlkA8QmgY"
  const resp = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=FW7V8w3_6MqBlS-aTTf4mblUoSruSIWlvtHlkA8QmgY`, {
    headers: {
      Autorization: `CLIENT-ID ${CLIENT_ID}`
    }
  })
  const data = await resp.json()
  const images = data.results.map(image => ({
    id: image.id,
    image: image.urls.small,
    link: image.links.html
  }))
  return new Response(JSON.stringify(images), { 
    headers: {
      'Content-type': 'application/json',
      ...corsHeaders
    }
  })
}

async function handleRequest(request) {
  if (request.method === "OPTIONS") {
    return new Response("OK", {headers: corsHeaders })
  }

  if (request.method === "POST") {
    return getImages(request)
  }

/*  return new Response(`Your query was ${query}`) */
}