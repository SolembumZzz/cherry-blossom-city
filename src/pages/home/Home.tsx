import { Box } from "@mui/material";
import AsyncButton from "../../components/button/AsyncButton";
import { mockCall } from "../../services/MockApiCall";

const Home: React.FC = () => {

    const handleOnClick = async () => {
        await mockCall(3000);
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
                lingerDuration={1000}
            >
                Test
            </AsyncButton>
        </Box>
    )
};

export default Home;