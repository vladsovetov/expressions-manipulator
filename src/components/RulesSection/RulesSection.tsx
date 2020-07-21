import React from 'react';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

type RulesSectionProps = {
  baseRules: string;
  onBaseRulesChanged: (event: React.ChangeEvent) => void;
  custom1Rules: string;
  onCustom1RulesChanged: (event: React.ChangeEvent) => void;
  custom2Rules: string;
  onCustom2RulesChanged: (event: React.ChangeEvent) => void;
  parsedRules: string;
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

const RulesSection: React.FC<RulesSectionProps> = (props) => {
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
            Rules controller
          </FormLabel>
          <FormGroup
            classes={{
              root: classes.formGroup,
            }}
          >
            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  multiline
                  defaultValue={props.baseRules}
                  onChange={props.onBaseRulesChanged}
                  variant="outlined"
                ></TextField>
              }
              label="Base"
              labelPlacement="top"
            />
          </FormGroup>
          <FormGroup
            classes={{
              root: classes.formGroup,
            }}
          >
            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  multiline
                  defaultValue={props.custom1Rules}
                  onChange={props.onCustom1RulesChanged}
                  variant="outlined"
                ></TextField>
              }
              label="Custom 1"
              labelPlacement="top"
            />
          </FormGroup>
          <FormGroup
            classes={{
              root: classes.formGroup,
            }}
          >
            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  multiline
                  defaultValue={props.custom2Rules}
                  onChange={props.onCustom2RulesChanged}
                  variant="outlined"
                ></TextField>
              }
              label="Custom 2"
              labelPlacement="top"
            />
          </FormGroup>
        </FormControl>
      </div>

      <div className={classes.column}>
        <FormControl fullWidth>
          <FormLabel
            classes={{
              root: classes.formLabel,
            }}
          >
            Parsed merged rules
          </FormLabel>
          <FormGroup
            classes={{
              root: classes.formGroup,
            }}
          >
            <FormControlLabel
              control={
                <TextField
                  fullWidth
                  multiline
                  rowsMax={24}
                  value={props.parsedRules}
                  disabled
                  variant="outlined"
                ></TextField>
              }
              label="Structure"
              labelPlacement="top"
            />
          </FormGroup>
        </FormControl>
      </div>
    </>
  );
};

export default RulesSection;
