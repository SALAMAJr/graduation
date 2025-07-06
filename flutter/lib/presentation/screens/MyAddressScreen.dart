// ✅ MyAddressesScreen.dart (معدل لإرجاع addressId إلى SwapDetailsScreen)
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:furniswap/data/models/adress/address_model.dart';
import 'package:furniswap/presentation/manager/adressCubit/cubit/address_cubit.dart';

class MyAddressesScreen extends StatefulWidget {
  final String? productId;

  const MyAddressesScreen({super.key, this.productId});

  @override
  State<MyAddressesScreen> createState() => _MyAddressesScreenState();
}

class _MyAddressesScreenState extends State<MyAddressesScreen> {
  String? selectedAddressId;

  @override
  void initState() {
    super.initState();
    context.read<AddressCubit>().getAllAddresses();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xffF5EFE6),
      appBar: AppBar(
        title: const Text("My Addresses"),
        backgroundColor: Colors.white,
        centerTitle: true,
        titleTextStyle: const TextStyle(
          color: Color(0xff694A38),
          fontWeight: FontWeight.bold,
          fontSize: 20,
        ),
        iconTheme: const IconThemeData(color: Color(0xff694A38)),
        elevation: 1,
      ),
      body: BlocBuilder<AddressCubit, AddressState>(
        builder: (context, state) {
          if (state is AddressLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is AddressListLoaded && state.addresses.isNotEmpty) {
            return Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: state.addresses.length,
                    itemBuilder: (context, index) {
                      final address = state.addresses[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 16),
                        elevation: 3,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12)),
                        child: RadioListTile<String>(
                          title: Text(address.fullName),
                          subtitle: Text(
                              "${address.streetAddress}, ${address.city}, ${address.state}, ${address.country}"),
                          value: address.id!,
                          groupValue: selectedAddressId,
                          onChanged: (value) {
                            setState(() {
                              selectedAddressId = value!;
                            });
                          },
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: ElevatedButton(
                    onPressed: selectedAddressId == null
                        ? null
                        : () {
                            Navigator.pop(context,
                                selectedAddressId!); // ✅ يتم إرجاع العنوان
                          },
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(double.infinity, 50),
                      backgroundColor: const Color(0xff694A38),
                    ),
                    child: const Text(
                      "Confirm Address",
                      style: TextStyle(color: Colors.white, fontSize: 16),
                    ),
                  ),
                ),
              ],
            );
          } else if (state is AddressError) {
            return Center(child: Text("❌ ${state.message}"));
          } else {
            return const Center(child: Text("لا يوجد عناوين محفوظة"));
          }
        },
      ),
    );
  }
}
