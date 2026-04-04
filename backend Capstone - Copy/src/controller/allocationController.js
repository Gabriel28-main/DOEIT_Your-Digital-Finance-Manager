import supabase from "../config/db.js";

export const CreateNewCategory = async (req, res) => {
    try {
        const { name, amount, icon } = req.body

        const { data: allocation, error } = await supabase
            .from('allocation')
            .insert([
                { name, amount, icon }
            ])
            .select()

        if (error) throw error

        res.status(201).json({
            status: 'success',
            message: 'kategori baru berhasil ditambahkan',
            data: allocation
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const ShowCategory = async (_, res) => {
    try {
        const { data: allocation, error } = await supabase
            .from('allocation')
            .select('*')

        if (error) throw error

        res.status(200).json({
            status: 'success',
            message: 'data berhasil ditampikan',
            data: allocation
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const UpdateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { name, amount, icon } = req.body

        const { data: allocation, error } = await supabase
            .from('allocation')
            .update({
                name,
                amount,
                icon
            })
            .eq('id', id)
            .select('*')

        if (error) throw error

        res.status(200).json({
            status: 'success',
            message: 'data berhasil diubah',
            data: allocation
        })

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

export const DeleteCategory = async (req, res) => {
    try{
        const {id} = req.params
        
        const{ data, error} = await supabase
        .from('allocation')
        .delete()
        .eq('id', id)
        
        if(error) throw error

        res.status(200).json({
            status: 'success',
            message: 'data berhasil dihapus'
        })
    }catch(error){
        res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}