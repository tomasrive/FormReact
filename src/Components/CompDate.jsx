import { GroupInputDate, InputDate, Label } from "../elements/Formularios"

export const CompDate = ({ date, hour }) => {
    return (
        <>
            <GroupInputDate>
                <div>
                    <Label>Fecha</Label>
                    <InputDate type='text' value={date} disabled />
                </div>

                <div>
                    <Label>Hora</Label>
                    <InputDate type='text' value={hour} disabled />
                </div>
            </GroupInputDate>
        </>
    )
}
