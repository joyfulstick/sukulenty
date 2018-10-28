import Guard from '../components/Guard'
import Permissions from '../components/Permissions'

const Admin = () => (
  <Guard>
    <Permissions />
  </Guard>
)

export default Admin
