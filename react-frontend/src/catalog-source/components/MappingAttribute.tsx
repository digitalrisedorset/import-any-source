import {useNavigate} from "react-router-dom";
import {StepForm} from "../../global/styles/StepForm";
import {useMappingVerifier} from "../../mapping/hooks/useMappingVerifier";
import {MappingReport} from "./MappingReport"

export const MappingAttributes: React.FC = () => {
    const mappingReady = useMappingVerifier()

    const navigate = useNavigate()


    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        navigate(`/catalog-source`);
    }

    return (
        <StepForm>
            <div className="main">
                <h2>Step 3</h2>

                <button type="submit" disabled={!mappingReady} onClick={handleSubmit}>
                    Mapping Attributes
                </button>
            </div>
            <MappingReport/>
        </StepForm>
)
}