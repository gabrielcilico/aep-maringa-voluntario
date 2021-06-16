import dotenv from 'dotenv'
import { app } from './app'

dotenv.config();

app.listen(3000, () => console.log('Server runing on port 3000...'))
