 import * as  ts from   "testcontainers"

export default class  TestContainer{

    private  container:ts.StartedTestContainer ;
    constructor(private image:string ,private port:number ){


    }

    
    async  start():Promise<ts.StartedTestContainer>{


         this.container = await new ts.GenericContainer(this.image)
           .withWaitStrategy(ts.Wait.forListeningPorts())
           .withEnvironment({ POSTGRES_PASSWORD :"gorm" , POSTGRES_USER:"gorm" , POSTGRES_DB:"design"})
           .withExposedPorts(this.port)
           .start();
         
         
        return this.container;  
    }
 
  
    getPort():number{
    return  this.container.getFirstMappedPort()
     
    }

    async stop(){
 
         this.container.stop();
    } 
}