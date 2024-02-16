import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';

import User from './shared/components/layout/user';
import Admin from './shared/components/layout/admin'

const App = () => {

    const user = useSelector(({ Auth }) => Auth.user)
    console.log(user);

    return (


        <BrowserRouter>
            {user.isAdmin && <Admin />}
            {!user.isAdmin && <User />}

        </BrowserRouter>

    )
}

export default App;
