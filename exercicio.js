
class usuario{

constructor(nome,sobrenome){
   this.nome = nome ;
   this.sobrenome = sobrenome;
}

 obternomecompleto(){
   return `${this.nome} ${this.sobrenome}`
}
}


let nome = new usuario('guilherme', 'meireles')


console.log(nome.obternomecompleto())