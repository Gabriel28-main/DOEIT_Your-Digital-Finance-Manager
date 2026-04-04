import supabase from '../config/db.js'

//Create
export const inputTransaction = async (req, res) => {
    try {
        const { date, amount, type, category, description } = req.body

        const { data: transaction, error } = await supabase
            .from('transaction')
            .insert([
                { date, amount, type, category, description }
            ])
            .select()

        if (error) throw error

        res.status(201).json({
            status: 'success',
            message: 'transaksi berhasil ditambahkan',
            data: transaction
        })

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        })
    }
}

//Read
export const getTransaction = async (req, res) => {
    try {
        const { data: transaction, error } = await supabase
            .from('transaction')
            .select('*')

        if (error) throw error

        res.status(200).json({
            message: 'Berhasil ambil data',
            data: transaction
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
