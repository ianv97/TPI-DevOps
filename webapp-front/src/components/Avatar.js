import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import getCookie from "../functions/getCookie";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import Context from "../Context";

const useStyles = makeStyles({
  avatar: {
    margin: 10,
    width: 200,
    height: 200,
    cursor: "pointer"
  }
});

const changeImage = () => {
  document.getElementById("avatarimg-input").click();
};

const handleImageChange = async (e, context, url) => {
  let form = new FormData();
  let reader = new FileReader();
  let input = e.target;

  await form.append("image", input.files[0]);
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    body: form,
    headers: {
      Authorization: "BEARER " + getCookie("token")
    }
  });
  if (response.ok) {
    reader.onload = function(event) {
      context.setImg(event.target.result);
    };
    reader.readAsDataURL(input.files[0]);
    window.container.success("Foto de perfil actualizada", "Éxito", {
      showAnimation: "animated rubberBand",
      hideAnimation: "animated flipOutX",
      timeOut: 7000,
      extendedTimeOut: 2000
    });
  } else {
    window.container.error(response.status + " " + response.statusText, "Error", {
      showAnimation: "animated rubberBand",
      hideAnimation: "animated flipOutX",
      timeOut: 7000,
      extendedTimeOut: 2000
    });
  }
};

function AvatarChange(props) {
  const classes = useStyles();
  const context = useContext(Context.Context);

  return (
    <Grid container direction="row" justify="center" className="mt-3">
      <Grid item>
        <Avatar
          alt="Avatar"
          id="avatarimg"
          src={context.img ? context.img : "/img/user.png"}
          className={classes.avatar}
          onClick={changeImage}
        />
        <input
          name="Avatar"
          id="avatarimg-input"
          type="file"
          onChange={e => handleImageChange(e, context, window.ApiUrl + "UserImage/" + props.match.params.id)}
          style={{ display: "none" }}
        />
      </Grid>
    </Grid>
  );
}

export default withRouter(AvatarChange);
