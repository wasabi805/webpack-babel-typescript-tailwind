
import IndexComponent from '../../src/index' 

describe('test', ()=>{
    it('tests that 1 + 1 is equal to 2',()=>{
        console.log( typeof IndexComponent )
        expect(1+1===2).toBe(true)
    })

    it('tests that 4 divided by 2 is equal to 2',()=>{
        expect(4/2 ===2).toBe(true)
    })
})

