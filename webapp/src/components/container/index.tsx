import { Grid } from "@mui/material";

export const Container = ({ children }: { children: JSX.Element }) => {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '80vh' }}>
      <Grid>{children}</Grid>
    </Grid>
  );
};
