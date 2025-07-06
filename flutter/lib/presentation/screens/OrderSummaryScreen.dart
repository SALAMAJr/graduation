import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:furniswap/presentation/manager/order/order_cubit.dart';
import 'package:furniswap/presentation/screens/ordersScreen.dart';

class OrderSummaryScreen extends StatefulWidget {
  final String offeredProductId;
  final String targetProductId;

  const OrderSummaryScreen({
    super.key,
    required this.offeredProductId,
    required this.targetProductId,
  });

  @override
  State<OrderSummaryScreen> createState() => _OrderSummaryScreenState();
}

class _OrderSummaryScreenState extends State<OrderSummaryScreen> {
  @override
  void initState() {
    super.initState();
    context.read<OrderCubit>().createOrder(
          offeredProductId: widget.offeredProductId,
          targetProductId: widget.targetProductId,
          paymentMethod: "card",
        );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Order Summary"),
        backgroundColor: Colors.white,
        centerTitle: true,
        titleTextStyle: const TextStyle(
          color: Color(0xff694A38),
          fontWeight: FontWeight.bold,
          fontSize: 20,
        ),
      ),
      body: BlocConsumer<OrderCubit, OrderState>(
        listener: (context, state) {
          if (state is OrderCreated) {
            final orderId = state.orderResponse.data.id;
            showDialog(
              context: context,
              builder: (_) => AlertDialog(
                title: const Text("Order Created"),
                content: Text("Order ID: $orderId"),
                actions: [
                  TextButton(
                    onPressed: () {
                      Navigator.pop(context);
                      Navigator.pushReplacement(
                        context,
                        MaterialPageRoute(builder: (_) => const OrdersScreen()),
                      );
                    },
                    child: const Text("OK"),
                  ),
                ],
              ),
            );
          } else if (state is OrderError) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text(state.message)),
            );
          }
        },
        builder: (context, state) {
          if (state is OrderLoading) {
            return const Center(child: CircularProgressIndicator());
          } else if (state is OrderCreated) {
            final orderId = state.orderResponse.data.id;
            return Center(
              child: Text(
                "Order created successfully!\nID: $orderId",
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 18),
              ),
            );
          } else if (state is OrderError) {
            return Center(child: Text("Error: ${state.message}"));
          }
          return const Center(child: Text("Initializing order..."));
        },
      ),
    );
  }
}
