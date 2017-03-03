# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_version = "~> 14.04"
  config.vm.hostname = hostname = "rethinkdb"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.

  config.vm.network :forwarded_port, guest: 8080, host: 8080 # RethinkDB Web UI
  config.vm.network :forwarded_port, guest: 28015, host: 28015 # Client driver
  config.vm.network :forwarded_port, guest: 29015, host: 29015 # Intracluster traffic
  config.vm.network :forwarded_port, guest: 3306, host: 3306 # MySQL

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  # config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
  #   vb.memory = "1024"
  # end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Define a Vagrant Push strategy for pushing to Atlas. Other push strategies
  # such as FTP and Heroku are also available. See the documentation at
  # https://docs.vagrantup.com/v2/push/atlas.html for more information.
  # config.push.define "atlas" do |push|
  #   push.app = "YOUR_ATLAS_USERNAME/YOUR_APPLICATION_NAME"
  # end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  # Provisioning
  config.vm.provision :shell do |sh|
    sh.inline = <<-EOF
      export DEBIAN_FRONTEND=noninteractive;

      # Add RethinkDB Source
      apt-key adv --fetch-keys http://download.rethinkdb.com/apt/pubkey.gpg 2>&1;
      echo "deb http://download.rethinkdb.com/apt $(lsb_release -sc) main" > /etc/apt/sources.list.d/rethinkdb.list;
      apt-get update --assume-yes;

      # RethinkDB Install & Setup
      apt-get install --assume-yes rethinkdb;
      sed -e 's/# bind=127.0.0.1/bind=all/g' /etc/rethinkdb/default.conf.sample > /etc/rethinkdb/instances.d/default.conf;
      rethinkdb create -d /var/lib/rethinkdb/instances.d/default 2>&1;

      service rethinkdb start;

      apt-get update
      debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
      debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
      apt-get install -y vim curl python-software-properties
      apt-get update
      apt-get -y install mysql-server
      sed -i "s/^bind-address/#bind-address/" /etc/mysql/my.cnf
      mysql -u root -proot -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION; FLUSH PRIVILEGES;"
      service mysql restart
    EOF
  end
end
