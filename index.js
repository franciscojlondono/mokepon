const express = require('express');
const cors=require('cors')

// Creamos la aplicación de Express
const app = express();

app.use(cors())
app.use(express.json())

const jugadores=[]

class Jugador{

  constructor(id){
    this.id=id
  }
  asignarMokepon(mokepon){
    this.mokepon=mokepon

  }
  actualizarPocision(x,y){
    this.x=x
    this.y=y
  }


}
class Mokepon{
  constructor(nombre){
    this.nombre=nombre
  }
}

// Escojemos un puerto por el que el servidor web escuchará
const port = 8080;

// Página para visualizar el mensaje "¡Hola Express!"
app.get("/unirse", (req, res) => {

  const id=`${Math.random()}`

  const jugador=new Jugador(id)

  jugadores.push(jugador)

res.setHeader("Access-Control-Allow-Origin","*")

  res.send(id);
});

app.post("/mokepon/:jugadorId",(req,res)=>{
  const jugadorId=req.params.jugadorId||""
  const nombre=req.body.mokepon||""
  const mokepon=new Mokepon(nombre)
  const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId=== jugador.id)
  if (
    jugadorIndex>=0) {
      
    jugadores[jugadorIndex].asignarMokepon(mokepon)
  }
  console.log(jugadores)
  console.log(jugadorId)
  res.end()

})
app.post("/mokepon/:jugadorId/posicion",(req,res)=>{
  const jugadorId=req.params.jugadorId||""
  const x=req.body.x||0
  const y=req.body.y||0
  const jugadorIndex=jugadores.findIndex((jugador)=> jugadorId=== jugador.id)
  if (jugadorIndex>=0) {
      
    jugadores[jugadorIndex].actualizarPocision(x,y)
  }
  const enemigos= jugadores.filter((jugador)=> jugadorId!== jugador.id)

  res.send({
    enemigos
  })

})
// Activamos el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`¡Servidor listo!`);
});