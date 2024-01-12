import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UserTable from "../../components/UserTable";

function UserList() {
  return (
    <Grid container spacing={3}>
      {/* User List */}
      <Grid item xs={12} md={8} lg={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <UserTable />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserList;
