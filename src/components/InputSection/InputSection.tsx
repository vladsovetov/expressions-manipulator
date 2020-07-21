import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  TextField,
  Checkbox,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export type Input = {
  name: string;
  value: boolean | number;
};

type InputSectionProps = {
  inputs: Input[];
  onInputChange: (value: boolean | number, inputName: string) => void;
  calculated: string | number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    column: {
      flex: '1 1 50%',
    },
    formLabel: {
      textAlign: 'center',
    },
    formGroup: {
      margin: theme.spacing(3),
    },
  })
);

const InputSection: React.FC<InputSectionProps> = (props) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.column}>
        <FormControl fullWidth>
          <FormLabel
            classes={{
              root: classes.formLabel,
            }}
          >
            Variable inputs
          </FormLabel>
          {props.inputs.map((input) => (
            <FormGroup
              classes={{
                root: classes.formGroup,
              }}
              key={input.name}
            >
              <FormControlLabel
                control={
                  typeof input.value === 'boolean' ? (
                    <Checkbox
                      checked={!!input.value}
                      onChange={(event) =>
                        props.onInputChange(event.target.checked, input.name)
                      }
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  ) : (
                    <TextField
                      fullWidth
                      multiline
                      defaultValue={input.value}
                      onChange={(event) =>
                        props.onInputChange(
                          parseFloat(event.target.value),
                          input.name
                        )
                      }
                      variant="outlined"
                    ></TextField>
                  )
                }
                label={input.name}
                labelPlacement="top"
              />
            </FormGroup>
          ))}
        </FormControl>
      </div>
      <div className={classes.column}>{`Result is: ${props.calculated}`}</div>
    </>
  );
};

export default InputSection;
