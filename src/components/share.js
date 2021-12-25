import React from "react";
import { Grid } from 'semantic-ui-react'
import {
    FacebookShareButton,
    FacebookMessengerShareButton,
    FacebookMessengerIcon,
    LinkedinShareButton,
    TwitterShareButton,
    TelegramShareButton,
    WhatsappShareButton,
    EmailShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    TelegramIcon,
    WhatsappIcon,
    EmailIcon,
} from 'react-share'

const SharingModule = ({ shareUrl, title }) => {
    return (
        <Grid padded centered>
            <Grid.Column>
                <WhatsappShareButton
                    url={shareUrl}
                    title={title}
                    separator=":: "
                >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>
            </Grid.Column>
            <Grid.Column>
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>
            </Grid.Column>
            <Grid.Column>
                <EmailShareButton
                    url={shareUrl}
                    subject={title}
                    body="Sharing the recording link -> "
                >
                    <EmailIcon size={32} round />
                </EmailShareButton>
            </Grid.Column>
            <Grid.Column>
                <FacebookShareButton
                    url={shareUrl}
                    quote={title}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </Grid.Column>
            <Grid.Column>
                <FacebookMessengerShareButton
                    url={shareUrl}
                    appId="521270401588372"
                >
                    <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>
            </Grid.Column>
            <Grid.Column>
                <LinkedinShareButton url={shareUrl}>
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </Grid.Column>
            <Grid.Column>
                <TelegramShareButton
                    url={shareUrl}
                    title={title}
                >
                    <TelegramIcon size={32} round />
                </TelegramShareButton>
            </Grid.Column>
        </Grid>
    );
}

export default SharingModule;