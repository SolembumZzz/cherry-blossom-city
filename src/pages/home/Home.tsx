import { Box } from "@mui/material";
import AsyncButton from "../../components/button/AsyncButton";
import { mockCall } from "../../services/MockApiCall";
import { useState } from "react";

const Home: React.FC = () => {
    const [isActionSuccessful, setIsActionSuccesful] = useState(true);

    const handleOnClick = async () => {
        await mockCall(3000, true).then(result => {
            setIsActionSuccesful(true);
        }).catch(error => {
            setIsActionSuccesful(false);
        });
    };

    return (
        <Box>
            <AsyncButton
                asyncButtonType="circle"
                variant="contained"
                color="primary"
                sx={{
                    width: '100px',
                    height: '37px',
                }}
                actionDoneText='Saved'
                asyncAction={handleOnClick}
                lingerDuration={2000}
                progressColor="lightgrey"
                isAsyncActionSuccess={isActionSuccessful}
            >
                Test
            </AsyncButton>
        </Box>
    )
};

export default Home;