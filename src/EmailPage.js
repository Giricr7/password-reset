import { Card, CardActions, CardContent, Button, TextField, Grid } from "@mui/material";
import { useState } from "react"
import URL from "./url";
import axios from "axios";
import swal from "sweetalert2";
import {HashLoader} from "react-spinners"
import { css } from "@emotion/react";
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';
import DraftsTwoToneIcon from '@mui/icons-material/DraftsTwoTone';






function EmailVerfication() {

// state variables
    const [email, setEmail] = useState('');
    let [loading, setLoading] = useState(false);   

    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    direction:column;
    justify-content:center;
    align-items:center;
  `;

// form submit handler
    let HandleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (email !== "") {
          // API call to check the email validation 
            let { data } = await axios.post(`${URL}/checkEmail`, { email });
            if (data === "available") {
                setLoading(false)
                swal.fire({
                    icon: 'success',
                    title: 'Mail sent',
                    text: 'Check your mail for the password reset link',
                });
               
                setEmail('');
                e.target.reset();
                
            } else if(data === 'duplicate'){
                setLoading(false)
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid Email Address!',
                  })
            }
      }
    }


    return (
        <div className = "App">
            {loading ? <HashLoader color={"blue"} loading={loading} css={override} size={50} /> :
                <div className="App" style={{ padding: "5%", background: "#bdbdbd" }}>
        <Grid
        className="email_grid"
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        >
                    <h2 style={{color:"black",fontFamily:"monospace"}}>Forgot Password</h2>
                    <Card
                        className="email_card"
                        style={{borderRadius:"20px"}}
                    >
                        <form onSubmit={HandleSubmit}>
                            <CardContent  style={{padding:"3%" }}>
                              <DraftsTwoToneIcon style={{color:"blue"}}/>  
                            <TextField
                                id="outlined-email-input"
                                label="Registered Mail-ID"
                                type="email"
                                style={{ minWidth: "100%" }}
                                onChange={(e) => { setEmail(e.target.value) }}
                                required
                                />
                            </CardContent>
                            <CardActions className="submit_div">
                                <Button  id="submit_btn" size="small" type="submit"><PublishTwoToneIcon style={{color:"blue"}}/> Submit</Button>
                            </CardActions>
                            </form>
                    </Card>
        </Grid> 
       
            </div>}
        </div>
    )
}


export default EmailVerfication