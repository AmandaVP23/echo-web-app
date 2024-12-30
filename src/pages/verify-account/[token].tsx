import { GetServerSideProps } from 'next';
import axios from 'axios';

interface VerifyAccountProps {
    isSuccess: boolean;
}

export const getServerSideProps: GetServerSideProps<VerifyAccountProps> = async (context) => {
    const { token } = context.params as { token: string };

    console.log('token', token);

    if (!token) {
        return {
            props: { success: false }
        }
    }

    try {
        await axios.get(`http://localhost:8080/users/verify/${token}`);
        return {
            props: {
                isSuccess: true,
            }
        }
    } catch (e) {
        console.log((e as any).response.data)
        return {
            props: {
                isSuccess: false,
            }
        }
    }
}

export default function VerifyAccountPage({ isSuccess }: VerifyAccountProps) {
    console.log(isSuccess);

    return (
        <div className="screen">
            <div className="content-wrapper">
                <img src="/logo-with-drawing.png" alt="logo" />
            </div>
        </div>
    );
}
