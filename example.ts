import { createClient } from '@supabase/supabase-js'
require('dotenv').config()

//create client
export const supabase = createClient(`${process.env.DOMAIN}`,`${process.env.SECRET_KEY}`)

//pagination function
export const getPagination = async (page: number, quantity: number) => {
    //maybe should be useful add a validator here to do not acept negative numbers
    let start = (page * quantity), final = (page * quantity + quantity - 1)
    return [ start, final ]
}

//using pagination function
const listProducts = async (page: number) => {
    
    const [ start, final ] = await getPagination(page, 4)//params(the number of page 0..n, elements per page)

    const { data, error } = await supabase
        .from('product')
        .select()
        .range(start, final)
    if (error) {
        throw new Error("not fetched")
    }
    return data
}

const test = async () =>{
    console.log('===================')
    console.log( await listProducts(0))
    console.log('===================')
    console.log( await listProducts(1))
    console.log('===================')
    console.log( await listProducts(2))
    console.log('===================')
}

test()
