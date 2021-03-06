import SvgIcon from '@mui/icons-material/VolunteerActivism';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import { Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const About = () => {

    const navigate = useNavigate();

    return (
        <>
            <Grid container sx={{
                p: 1
            }}>
                <Grid container direction="column" sx={{
                    p: 1,
                }}>
                    {/* <Grid container direction="row">
                        {/* <Grid style={{ width: '40vw' }}>
                        <SvgIcon style={{ fontSize: '15vw', margin: 'auto', color: 'lightGray', marginLeft: '10vw', marginBottom: '2vw' }} component={VolunteerActivismRoundedIcon} inheritViewBox />
                    </Grid> */}
                    {/* </Grid> */}
                    <Grid sx={{width:'50vw', m: 'auto' }}>
                        <h1>משלבים</h1>
                        <p>
                            פרויקט "משלבים" הוקם בשנת 2022 כתוצאה מהגברת המודעות הציבורית בנושא שיוויון חברתי בתעסוקה, והכרה בחשיבות הנושא.
                            אם בעבר העסקת אנשים עם מוגבלות נעשתה פעמים רבות ממקום של חסד ולא ממקום של אמונה ביכולתם של אנשים עם מוגבלות לבצע את המשימות כשווים, הרי שהתפיסה המקצועית  – בשנים האחרונות הולכת ומשתנה. העסקת אנשים עם מוגבלות מתמקדת ביכולות ולא במוגבלות- שינוי מהותי ששם במרכז את יכולותיו של האדם לבצע את תפקידו ולא את הדעות הקדומות (ופעמים רבות - השגויות) לגבי יכולתו לבצע תפקיד ספציפי בהינתן ההתאמות הנדרשות לו.
                            מערכת זו מבצעת רישום של בעלי מוגבלויות המעוניינים לתרום לחברה מכישוריהם ויכולתם על אף מוגבלותם, וכן רישום של בעלי עסקים המעוניינים לתרום לחברה בנושא זה, ומבצעת את השיבוץ האופטימאלי ביותר עבור המעסיק והמועסק כך שיענה על דרישות 2 הצדדים.
                      </p>
                        <img src={require("./images/4.png")} sx={{ m: 'auto' }}></img>
                    </Grid>
                    {/*C:\Users\WIN 10\Desktop\client\public\4.png*/}

                    {/* <Grid item style={{ width: '30vw' }}>
                        </Grid>
                        <Grid style={{ width: '30vw' }}>
                        </Grid>
                    <Grid container direction="row">
                        <Grid item style={{ width: '40vw' }}>
                            <SvgIcon style={{opacity:'0.5', fontSize: '15vw', margin: 'auto', color: 'deepPink', marginLeft: '10vw', marginBottom: '2vw' }} component={VolunteerActivismRoundedIcon} inheritViewBox />
                        </Grid>
                    </Grid>

                    <Grid container direction="row">
                        <Grid style={{ width: '40vw' }}>
                            <SvgIcon style={{ fontSize: '15vw', margin: 'auto', color: 'lightGray', marginLeft: '10vw', marginBottom: '2vw' }} component={VolunteerActivismRoundedIcon} inheritViewBox />
                        </Grid>
                    </Grid> */}

                </Grid>
            </Grid>
        </>
    );
}

export default About;