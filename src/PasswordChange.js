import { Card, CardActions, CardContent, Button, TextField, Grid } from "@mui/material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "./url";
import {HashLoader} from "react-spinners"
import swal from "sweetalert2";
import { css } from "@emotion/react";
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import PublishTwoToneIcon from '@mui/icons-material/PublishTwoTone';

function PasswordChange() {

//state variables
    const [new_pwd, setNew_Pwd] = useState('');
    const [cnfrm_pwd, setCnfrm_Pwd] = useState('');
    const { token } = useParams();
    let navigate = useNavigate();
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
   let handleSubmit =async (e) => {
       e.preventDefault();
       setLoading(true)
       if (new_pwd !== cnfrm_pwd) {
           setLoading(false);
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Passwords mismatch!',
          })
       } else {
           // API call to reset the password
           let result = await axios.patch(`${URL}/reset-password`, { token, new_pwd });
           if (result.data !== "link expired") {
            setLoading(false)
            swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password reset successful !',
            })
               setNew_Pwd('');
               setCnfrm_Pwd('');
               navigate("/")
           } else {
            setLoading(false)
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Link Expired!',
            })
                navigate("/")
            }
        }
    }

    return (
        <div className="App">
            {
                loading?<HashLoader color={"blue"} loading={loading} css={override} size={50} /> :
            
                <div style={{ padding: "10%", background: "#bdbdbd" }}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                        style={{ minHeight: '100vh', minWidth: "500px" }}
                    >

                        <Grid item xs={3}>
                        </Grid>
                        <h2 style={{ color: "black", fontFamily: "monospace" }}>New Password</h2>
                        <Card
                            style={{ minWidth: "500px", borderRadius: "20px" }}
                        
                        >
                            <form onSubmit={handleSubmit}>
                                <CardContent style={{ minWidth: "400px" }}>
                                    <LockOpenTwoToneIcon style={{ color: "blue" }} />
                                    <TextField
                                        id="newPassword"
                                        label="New Password"
                                        type="password"
                                        style={{ minWidth: "100%" }}
                                        onChange={(e) => { setNew_Pwd(e.target.value) }}
                                        inputProps={{ minLength: 8 }}
                                        required
                                    />
                                    <br /><br /><br />
                                    <VpnKeyTwoToneIcon style={{ color: "blue" }} />
                                    <TextField
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        type="password"
                                        inputProps={{ minLength: 8 }}
                                        style={{ minWidth: "100%" }}
                                        onChange={(e) => { setCnfrm_Pwd(e.target.value) }}
                                        required
                                    />
                                </CardContent>
                                <CardActions className="submit_div">
                                    <Button id="submit_btn" size="small" type="submit" ><PublishTwoToneIcon style={{ color: "blue" }} /> Submit</Button>
                                </CardActions>
                            </form>
                        </Card>
                    </Grid>
       
                </div>
            }
            </div>
    )
}

export default PasswordChange