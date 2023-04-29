# Check out https://catalog.redhat.com/software/containers/ubi8/ubi/ to select a new base image
FROM registry.access.redhat.com/ubi8/nodejs-16-minimal as intermediate

USER root

RUN microdnf install git openssh-clients -y

RUN microdnf install bzip2 -y

RUN microdnf --nodocs update nodejs* npm* &&  microdnf clean all && rm -rf /mnt/rootfs/var/cache/* /mnt/rootfs/var/log/dnf* /mnt/rootfs/var/log/yum.*


RUN useradd -u 1001 -m node

USER node

ARG SSH_PRIVATE_KEY

RUN mkdir -p /home/node/app && \
  mkdir -p /home/node/.ssh && chmod 0700 /home/node/.ssh && \
  echo -n "${SSH_PRIVATE_KEY}" | base64 -d > /home/node/.ssh/id_rsa && chmod 700 /home/node/.ssh/id_rsa

WORKDIR /home/node/app
# Install app dependencies
COPY --chown=node package*.json ./

RUN npm install -g npm@8.3.2

RUN npm install

FROM registry.access.redhat.com/ubi8/nodejs-16-minimal

USER root

RUN rpm -ivh https://dl.fedoraproject.org/pub/epel/epel-release-latest-8.noarch.rpm

RUN microdnf update && microdnf upgrade -y && microdnf install ghostscript poppler-utils GraphicsMagick java-11-openjdk-headless vim -y && microdnf clean all && \
  rm -rf /mnt/rootfs/var/cache/* /mnt/rootfs/var/log/dnf* /mnt/rootfs/var/log/yum.*

ENV TZ="Asia/Kolkata"

USER 1001

WORKDIR /opt/app-root/src
# Bundle app source code
COPY --chown=1001 --from=intermediate /home/node/app /opt/app-root/src

COPY --chown=1001 . /opt/app-root/src

RUN npm run build
# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=3018

EXPOSE ${PORT}

HEALTHCHECK --interval=5m --timeout=10s CMD curl -f http://localhost:3018/API/UserManagement/ping || exit 1
#ENTRYPOINT ["/sbin/tini", "--"]

CMD ["node","-r", "source-map-support/register","."]
