





class PrCheck {
    perm=[]

    setR(r){
        if(!r){
           throw new Error('Parameter not found')}
        else{
            if(this.perm.find(e=> e.hasOwnProperty(r))){
                throw new Error("Already exists this role")
            }else{
                this.perm.push({[r]:[]})
                return 'success'
            }
        }
    }
     addRt(r,rt){
        if(!r||!rt){
         throw new Error('Role and routes necesary')
        }else{
            let current=[]
            if(this.perm.find((e,i)=> e.hasOwnProperty(r)&& current.push(i))){
                this.perm[current[0]][r].push(rt)
                console.log("success")
            }else{
                throw new Error("Role not exist")
            }
        }
    }
    delR(r){
        if(!r){
            throw new Error("Parameter not found")
        }else{
            let current=[]
            if(this.perm.find((e,i)=> e.hasOwnProperty(r)&&current.push(i))){
                this.perm= this.perm.filter((e,i)=> i!==current[0])
                return
            }
        }
        throw new Error("Role not exist")
    }
    isPerm(r,rt){
        let current=[]
        let rl=this.perm.find((e,i)=>e.hasOwnProperty(r)&&current.push(e)&&current.push(i))
        console.log(current)
        if(current.length>0){
            if(this.perm[current[1]][r].includes(rt)){
                return true
            }else{
                return false
            }
        }
        return false
    }
}


let rts= new PrCheck()
rts.setR('Admin')
rts.addRt('Admin','/admin')
console.log(rts.isPerm('Admin','/admin'))
module.exports=rts





